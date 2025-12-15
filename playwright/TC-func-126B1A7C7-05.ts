import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-05 - Validate successful login using a valid authentication token", async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://example.com/login');

  // Step 1: User submits login request with valid token
  const token = 'valid-auth-token';
  await page.locator('[data-testid="login-token-input"]').fill(token);
  await page.locator('[data-testid="login-submit"]').click();

  // Expected: System accepts token and authenticates user
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

  // Step 2: System returns success response and session token
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(c => c.name === 'session_token');
  expect(sessionCookie).toBeDefined();
  await expect(page.locator('[data-testid="user-profile"]')).toBeVisible();

  // Postconditions: User session is active and user is redirected to dashboard
  // (already verified above)

  // Authentication token is marked as used in audit log
  const auditEntry = await page.locator('[data-testid="audit-log-token"]').textContent();
  expect(auditEntry).toContain(token);
});