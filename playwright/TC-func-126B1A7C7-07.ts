import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-07 - Expired token login ensures system rejects authentication and displays error", async ({ page }) => {
  // Step 1: User submits login request with expired token
  await page.goto('/login');
  await page.locator('[data-testid="token-input"]').fill('expired-token');
  await page.locator('[data-testid="login-submit"]').click();

  // Expected: System receives request
  const response = await page.waitForResponse('**/login');
  expect(response.ok()).toBeTruthy();

  // Step 2: System validates token and detects expiration
  // Expected: Token is invalid
  expect(response.status()).toBe(401);
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();

  // Step 3: System returns error message token expired
  // Expected: User sees error message
  const errorText = await page.locator('[data-testid="error-message"]').textContent();
  expect(errorText).toMatch(/token expired|token is invalid/i);

  // Postconditions: User remains logged out, No session created, Error logged in system
  const token = await page.evaluate(() => localStorage.getItem('token'));
  expect(token).toBeNull();
});