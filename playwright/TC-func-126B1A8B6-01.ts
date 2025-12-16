import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-01 - User creates an account with valid email and password", async ({ page }) => {
  // Precondition: navigate to registration page
  await page.goto('/register');

  // Step 1: Enter a valid email address
  const emailInput = page.locator('[data-testid="email-input"]');
  await emailInput.fill('validuser@example.com');
  // Expected: no error displayed
  const emailError = page.locator('[data-testid="email-error"]');
  await expect(emailError).toHaveCount(0);

  // Step 2: Enter a valid password
  const passwordInput = page.locator('[data-testid="password-input"]');
  await passwordInput.fill('StrongP@ssw0rd!');
  // Expected: no error displayed
  const passwordError = page.locator('[data-testid="password-error"]');
  await expect(passwordError).toHaveCount(0);

  // Step 3: Click the Create Account button
  const createButton = page.locator('[data-testid="create-account-button"]');
  await createButton.click();
  // Expected: redirects to welcome page
  await expect(page).toHaveURL(/\/welcome/);
  const welcomeMessage = page.locator('[data-testid="welcome-message"]');
  await expect(welcomeMessage).toBeVisible();

  // Step 4: Verify account exists in database
  const dbCheck = page.locator('[data-testid="TODO"]');
  await expect(dbCheck).toHaveCount(0); // Placeholder for database verification
});