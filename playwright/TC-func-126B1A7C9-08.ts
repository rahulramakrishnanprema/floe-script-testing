import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-08 - Verify that the system does not accept tampered authentication tokens", async ({ page }) => {
  // Precondition: navigate to login page
  await page.goto('https://example.com/login'); // replace with actual URL

  // Step 1: Enter the tampered token into the token field and submit
  await page.fill('[data-testid="token-input"]', 'tamperedToken');
  await page.click('[data-testid="login-submit"]');

  // Expected: The system detects signature mismatch and rejects the token
  const errorLocator = page.locator('[data-testid="error-message"]');
  await expect(errorLocator).toBeVisible();
  await expect(errorLocator).toHaveText(/token is invalid|tampered|signature mismatch/i);

  // Step 2: Verify that an error message is displayed stating token is invalid or tampered
  // Expected: Error message appears and user remains on login page
  await expect(page).toHaveURL(/\/login/);
});