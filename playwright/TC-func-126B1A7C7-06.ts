import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-06 - Validate login attempt with an expired authentication token", async ({ page }) => {
  // Precondition: User has a registered account, Authentication token has expired, System time is synchronized
  await page.goto('/login');

  // Step 1: User submits login request with expired token
  await page.locator('[data-testid="token-input"]').fill('expiredToken');
  await page.locator('[data-testid="login-button"]').click();

  // Expected: System rejects token and returns error message
  const errorMessage = await page.locator('[data-testid="error-message"]').textContent();
  expect(errorMessage).toContain('Token expired');

  // Step 2: System logs the failed attempt
  await page.goto('/audit-log');
  const auditEntry = await page.locator('[data-testid="audit-log-entry"]').filter({ hasText: 'Token expiration event' });
  await expect(auditEntry).toBeVisible();

  // Postconditions: User remains unauthenticated, No session token is issued, Error message displayed to user
  await expect(page.locator('[data-testid="user-profile"]')).toBeHidden();

  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(cookie => cookie.name === 'session_token');
  expect(sessionCookie).toBeUndefined();
});