import { test, expect } from '@playwright/test';

test('TC-func-126B1A7C7-07 - Validate login attempt with an invalid authentication token format', async ({ page }) => {
  // Precondition: Navigate to the login page
  await page.goto('/login');

  // Step 1: User submits login request with malformed token
  await page.locator('[data-testid="username"]').fill('testuser');
  await page.locator('[data-testid="password"]').fill('wrongpass');
  await page.locator('[data-testid="auth-token"]').fill('invalidToken');
  await page.locator('[data-testid="login-button"]').click();

  // Expected: System rejects token and returns error message
  const errorMsg = page.locator('[data-testid="error-message"]');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText(/Invalid token format|Error/);

  // Step 2: System logs the invalid token attempt
  await page.waitForResponse((response) => {
    if (!response.url().includes('/api/audit')) return false;
    const postData = response.request().postData();
    return postData && postData.includes('INVALID_TOKEN_FORMAT');
  });

  // Postcondition: User remains unauthenticated, no session token is issued
  const sessionToken = await page.evaluate(() => localStorage.getItem('sessionToken'));
  expect(sessionToken).toBeNull();
});