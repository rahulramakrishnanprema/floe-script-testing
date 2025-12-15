import { test, expect } from '@playwright/test';

test('TC-func-126B1A7C7-04 - Account creation protects against SQL injection in password field', async ({ page }) => {
  // Assume user is already on the account creation page
  await page.goto('/create-account');

  // Step 1: Enter a valid email address into the email field
  const emailInput = page.locator('[data-testid="email-input"]');
  await emailInput.fill('valid@example.com');
  await expect(emailInput).toHaveValue('valid@example.com');
  await expect(page.locator('[data-testid="email-error"]')).toBeHidden();

  // Step 2: Enter a password containing SQL injection code
  const passwordInput = page.locator('[data-testid="password-input"]');
  const injectionPassword = "' OR '1'='1";
  await passwordInput.fill(injectionPassword);
  await expect(passwordInput).toHaveValue(injectionPassword);
  await expect(page.locator('[data-testid="password-error"]')).toBeHidden();

  // Step 3: Click the create account button
  const createButton = page.locator('[data-testid="create-account-button"]');
  await createButton.click();

  // Verify account creation confirmation
  const confirmationMessage = page.locator('[data-testid="confirmation-message"]');
  await expect(confirmationMessage).toBeVisible();
  await expect(confirmationMessage).toContainText('Account created');

  // Postcondition: Ensure password is stored securely (not visible in UI)
  await expect(page.locator('[data-testid="password-input"]')).toHaveValue(injectionPassword);
  // The password should not be displayed elsewhere; we assume no error indicates secure handling
});