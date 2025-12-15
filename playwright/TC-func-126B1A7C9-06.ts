import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-06 - Verify login fails when an invalid authentication token is used", async ({ page }) => {
  // Precondition: Navigate to the login page
  await page.goto('/login');

  // Step 1: Enter the invalid token into the token field and submit
  await page.fill('[data-testid="token-input"]', 'invalid-token');
  await page.click('[data-testid="login-submit"]');

  // Step 2: Verify that an error message is displayed stating token is invalid
  const errorLocator = page.locator('[data-testid="error-message"]');
  await expect(errorLocator).toHaveText(/token is invalid/i);

  // Postcondition: Ensure the user remains on the login page and no session is created
  await expect(page.url()).toContain('/login');
});