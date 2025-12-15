import { test, expect } from '@playwright/test';

test('TC-func-126B1A7C7-01 - Verify successful account creation with valid email and password', async ({ page }) => {
  // Step 1: Open the registration page
  await page.goto('https://example.com/register');
  const registrationPage = page.locator('[data-testid="registration-page"]');
  await expect(registrationPage).toBeVisible();

  // Step 2: Enter email and password
  const emailInput = page.locator('[data-testid="email-input"]');
  const passwordInput = page.locator('[data-testid="password-input"]');
  await emailInput.fill('user@example.com');
  await passwordInput.fill('StrongPass123');
  await expect(emailInput).toHaveValue('user@example.com');
  await expect(passwordInput).toHaveValue('StrongPass123');

  // Step 3: Click register button
  const registerButton = page.locator('[data-testid="register-button"]');
  await registerButton.click();
  const confirmationMessage = page.locator('[data-testid="confirmation-message"]');
  await expect(confirmationMessage).toBeVisible();

  // Step 4: Verify user is logged in
  const userDashboard = page.locator('[data-testid="user-dashboard"]');
  await expect(userDashboard).toBeVisible();
});