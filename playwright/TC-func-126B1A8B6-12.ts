import { test, expect } from '@playwright/test';

const dashboardUrl = 'https://example.com/dashboard';

test('TC-func-126B1A8B6-12 - Verify that an unauthenticated user is prevented from accessing the dashboard', async ({ page }) => {
  // Step 1: Attempt to access the dashboard URL directly
  await page.goto(dashboardUrl);
  await expect(page).toHaveURL(/login/);
  await expect(page.locator('[data-testid="login-form"]')).toBeVisible();

  // Step 2: Confirm that no dashboard data is displayed
  await expect(page.locator('[data-testid="dashboard-stats"]')).not.toBeVisible();
});