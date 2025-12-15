import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-02 - System rejects registration with invalid email format", async ({ page }) => {
  // Step 1: Navigate to registration page
  await page.goto('/register');

  // Verify registration form is displayed
  const registrationForm = page.locator('[data-testid="registration-form"]');
  await expect(registrationForm).toBeVisible();

  // Step 2: Enter email and password
  const emailInput = page.locator('[data-testid="email-input"]');
  const passwordInput = page.locator('[data-testid="password-input"]');
  await emailInput.fill('invalidemail');
  await passwordInput.fill('StrongPass123');

  // Verify form accepts input
  await expect(emailInput).toHaveValue('invalidemail');
  await expect(passwordInput).toHaveValue('StrongPass123');

  // Step 3: Submit registration form
  const registerButton = page.locator('[data-testid="register-button"]');
  await registerButton.click();

  // Verify error message for invalid email format
  const emailError = page.locator('[data-testid="email-error"]');
  await expect(emailError).toBeVisible();
  await expect(emailError).toContainText('invalid email format');
});