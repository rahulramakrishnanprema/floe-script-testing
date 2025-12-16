import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-03 - User creates an account with password at minimum allowed length", async ({ page }) => {
  // preconditions: User on registration page
  await page.goto('/register');

  // Step 1: Enter a valid email
  const emailInput = page.locator('[data-testid="email-input"]');
  await emailInput.fill('testuser@example.com');
  await expect(emailInput).toHaveValue('testuser@example.com');

  // Step 2: Enter an 8 character password
  const passwordInput = page.locator('[data-testid="password-input"]');
  await passwordInput.fill('Aa1!2345');
  await expect(passwordInput).toHaveValue('Aa1!2345');

  // Step 3: Click Create Account
  const createButton = page.locator('[data-testid="create-account-button"]');
  await createButton.click();
  await expect(page.locator('text=Account created successfully')).toBeVisible();

  // Step 4: Verify password stored hashed
  const hashedIndicator = page.locator('[data-testid="TODO"]');
  await expect(hashedIndicator).toBeVisible();
});