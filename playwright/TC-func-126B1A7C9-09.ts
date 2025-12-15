import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-09 - Verify that the login process integrates correctly with the authentication server to validate tokens", async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://example.com/login');

  // Step 1: Enter the valid token into the token field and submit
  const tokenInput = page.locator('[data-testid="token-input"]');
  await tokenInput.fill('VALID_TOKEN');
  const submitButton = page.locator('[data-testid="login-submit"]');
  await submitButton.click();

  // Expectation: The system sends token to authentication server for validation
  const validateResponse = await page.waitForResponse('**/auth/validate');
  expect(validateResponse.ok()).toBeTruthy();

  // Step 2: Authentication server responds with success and user profile
  // Expectation: The system receives success response and logs the user in
  const userProfile = page.locator('[data-testid="user-profile"]');
  await expect(userProfile).toBeVisible();
});