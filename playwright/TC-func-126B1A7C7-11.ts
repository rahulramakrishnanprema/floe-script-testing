import { test, expect } from '@playwright/test';

const dashboardUrl = 'https://example.com/dashboard';

test("TC-func-126B1A7C7-11 - Verify that unauthenticated users cannot access the dashboard", async ({ page }) => {
  // Step 1: Attempt to navigate to the dashboard page
  await page.goto(dashboardUrl);
  // Expect redirection to login page
  await expect(page).toHaveURL(/login/);
  await expect(page.locator('[data-testid="login-form"]')).toBeVisible();

  // Step 2: Verify that dashboard content is not displayed
  const dashboardStats = page.locator('[data-testid="dashboard-stats"]');
  await expect(dashboardStats).toHaveCount(0);
});