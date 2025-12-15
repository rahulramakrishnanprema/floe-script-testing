import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-09 - Verify dashboard behavior when there are no user statistics available", async ({ page }) => {
  // Assume user is already logged in as an administrator

  // Step 1: Navigate to the dashboard page via the main menu
  await page.locator('[data-testid="TODO"]').click();
  await expect(page).toHaveURL(/.*\/dashboard/);

  // Step 2: Check the statistics widgets for zero or 'no data' indicators
  const widgets = page.locator('[data-testid="stats-widget"]');
  const widgetCount = await widgets.count();
  expect(widgetCount).toBeGreaterThan(0);

  for (let i = 0; i < widgetCount; i++) {
    const widget = widgets.nth(i);
    await expect(widget).toContainText(/0|no data/i);
  }

  // Ensure no error messages are displayed
  await expect(page.locator('[data-testid="error"]')).toHaveCount(0);
});