import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-01 - User can create account with valid email and password", async ({ page }) => {
  // Step 1: Navigate to registration page
  await page.goto('https://example.com/register');
  const registrationForm = page.locator('[data-testid="registration-form"]');
  await expect(registrationForm).toBeVisible();

  // Step 2: Enter email and password
  const emailInput = page.locator('[data-testid="email"]');
  const passwordInput = page.locator('[data-testid="password"]');
  await emailInput.fill('user@example.com');
  await passwordInput.fill('StrongPass123');
  await expect(emailInput).toHaveValue('user@example.com');
  await expect(passwordInput).toHaveValue('StrongPass123');

  // Step 3: Submit registration form
  const submitButton = page.locator('[data-testid="submit"]');
  await submitButton.click();
  const confirmationMessage = page.locator('[data-testid="confirmation-message"]');
  await expect(confirmationMessage).toContainText('Account created');
});