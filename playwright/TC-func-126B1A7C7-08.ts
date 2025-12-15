import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-08 - Verify that the dashboard loads and displays key user statistics correctly", async ({ page }) => {
  // Step 1: Navigate to the dashboard page via the main menu
  await page.click('[data-testid="menu-dashboard"]');
  await expect(page).toHaveURL(/dashboard/);

  // Step 2: Verify that the key statistics widgets are visible on the page
  const widgets = page.locator('[data-testid="stat-widget"]');
  const widgetCount = await widgets.count();
  await expect(widgetCount).toBeGreaterThan(0);
  for (let i = 0; i < widgetCount; i++) {
    const widget = widgets.nth(i);
    await expect(widget).toBeVisible();
    const value = await widget.textContent();
    await expect(value).not.toBe('');
  }

  // Step 3: Cross check the displayed values against the expected data from the backend
  const response = await page.request.get('/api/user-stats');
  await expect(response.ok()).toBeTruthy();
  const stats = await response.json();

  for (let i = 0; i < widgetCount; i++) {
    const widget = widgets.nth(i);
    const key = await widget.getAttribute('data-stat-key');
    const displayedValue = await widget.textContent();
    const expectedValue = stats[key];
    await expect(displayedValue).toBe(String(expectedValue));
  }
});