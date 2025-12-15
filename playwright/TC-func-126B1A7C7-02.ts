import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-02 - Account creation fails with invalid email format", async ({ page }) => {
  // Precondition: User is on the account creation page
  await page.goto('https://example.com/create-account');

  // Step 1: Enter an invalid email address such as 'userexample.com' into the email field
  const emailInput = page.locator('[data-testid="email-input"]');
  await emailInput.fill('userexample.com');
  const emailError = page.locator('[data-testid="email-error"]');
  await expect(emailError).toBeVisible();

  // Step 2: Enter a valid password into the password field
  const passwordInput = page.locator('[data-testid="password-input"]');
  await passwordInput.fill('ValidP@ssw0rd!');
  const passwordError = page.locator('[data-testid="password-error"]');
  await expect(passwordError).toHaveCount(0);

  // Step 3: Click the create account button
  const createButton = page.locator('[data-testid="create-account-button"]');
  await createButton.click();

  // Expected: System does not create account and displays error message about email format
  await expect(emailError).toBeVisible();
  await expect(page.url()).toContain('create-account');
});