import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-03 - System rejects registration with weak password", async ({ page }) => {
  await page.goto('https://example.com/register');

  const registrationForm = page.locator('[data-testid="registration-form"]');
  await expect(registrationForm).toBeVisible();

  const emailInput = page.locator('[data-testid="email-input"]');
  const passwordInput = page.locator('[data-testid="password-input"]');
  await emailInput.fill('user2@example.com');
  await passwordInput.fill('123');

  await expect(emailInput).toHaveValue('user2@example.com');
  await expect(passwordInput).toHaveValue('123');

  const submitButton = page.locator('[data-testid="register-submit"]');
  await submitButton.click();

  const errorMessage = page.locator('[data-testid="error-message"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Password too weak');

  await expect(page).toHaveURL('https://example.com/register');
});