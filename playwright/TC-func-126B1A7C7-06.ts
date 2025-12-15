import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-06 - Valid token login verifies successful authentication and session creation", async ({ page }) => {
  // Step 1: User submits login request with token
  await page.goto('https://example.com/login');
  await page.fill('[data-testid="token-input"]', 'VALID_TOKEN');
  await page.click('[data-testid="login-button"]');
  const request = await page.waitForRequest(req => req.url().includes('/login') && req.method() === 'POST');
  expect(request).toBeTruthy();

  // Step 2: System validates token against auth service
  const response = await request.response();
  expect(response?.status()).toBe(200);

  // Step 3: System creates user session
  const sessionCookie = (await page.context().cookies()).find(c => c.name === 'session_token');
  expect(sessionCookie).toBeTruthy();

  // Step 4: System redirects to dashboard
  await expect(page).toHaveURL('https://example.com/dashboard');
  await expect(page.locator('[data-testid="dashboard-header"]')).toBeVisible();
});