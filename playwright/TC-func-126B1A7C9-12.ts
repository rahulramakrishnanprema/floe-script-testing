import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-12 - Verify dashboard is not accessible to unauthenticated users", async ({ page }) => {
  // Step 1: Open dashboard URL without logging in
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/);
  await expect(page.locator('[data-testid="login-form"]')).toBeVisible();

  // Step 2: Attempt to access API endpoint without authentication token
  const response = await page.request.get('/api/dashboard');
  await expect(response.status()).toBe(401);

  // Postcondition: No dashboard data exposed
  await expect(page.locator('[data-testid="dashboard-data"]')).toHaveCount(0);
});