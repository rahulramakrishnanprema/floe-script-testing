import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-10 - Verify that unauthorized users cannot access the dashboard", async ({ page }) => {
  // Step 1: Attempt to navigate directly to the dashboard URL
  await page.goto('https://example.com/dashboard');

  // Expectation: The system redirects to the login page or displays an access denied message
  await expect(page).toHaveURL(/\/login|\/access-denied/);

  // Step 2: Confirm that no dashboard data is displayed
  const dashboardWidget = page.locator('[data-testid="dashboard-widget"]');
  await expect(dashboardWidget).toHaveCount(0);
});