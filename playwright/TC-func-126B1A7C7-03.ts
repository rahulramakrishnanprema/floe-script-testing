import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-03 - Account creation fails with password that is too short", async ({ page }) => {
  // Step 1: Enter a valid email address into the email field
  const emailInput = page.locator('[data-testid="email-input"]');
  await emailInput.fill('validuser@example.com');
  await expect(emailInput).toHaveValue('validuser@example.com');
  const emailError = page.locator('[data-testid="email-error"]');
  await expect(emailError).toBeHidden();

  // Step 2: Enter a password shorter than the minimum required length into the password field
  const passwordInput = page.locator('[data-testid="password-input"]');
  await passwordInput.fill('short');
  const passwordError = page.locator('[data-testid="password-error"]');
  await expect(passwordError).toBeVisible();
  await expect(passwordError).toContainText('Password must be at least');

  // Step 3: Click the create account button
  const createButton = page.locator('[data-testid="create-account-button"]');
  await createButton.click();

  // Expect system does not create account and displays error message about password length
  await expect(passwordError).toBeVisible();
  await expect(passwordError).toContainText('Password must be at least');

  // Ensure user remains on the account creation page
  await expect(page).toHaveURL(/create-account/);
});