import { test, expect } from '@playwright/test';

test('TC-func-126B1A7C7-03 - Verify error handling for password that is too short during account creation', async ({ page }) => {
  // Step 1: Open the registration page
  await page.goto('https://example.com/register');
  await expect(page).toHaveURL(/register/);

  // Step 2: Enter email and password
  const emailInput = page.locator('[data-testid="email"]');
  const passwordInput = page.locator('[data-testid="password"]');
  await emailInput.fill('user@example.com');
  await passwordInput.fill('short');
  await expect(emailInput).toHaveValue('user@example.com');
  await expect(passwordInput).toHaveValue('short');

  // Step 3: Click the register button
  const registerButton = page.locator('[data-testid="register-button"]');
  await registerButton.click();
  const passwordError = page.locator('[data-testid="password-error"]');
  await expect(passwordError).toBeVisible();
  await expect(passwordError).toHaveText('Password too short');
});