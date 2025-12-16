import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-11 - Verify dashboard handles zero statistics gracefully", async ({ page }) => {
  // Step 1: Navigate to the dashboard page
  await page.goto('/dashboard');
  await expect(page.locator('body')).toBeVisible();

  // Step 2: Verify that statistics sections show zero values or a message indicating no data
  const stats = page.locator('[data-testid^="stat-"]');
  const count = await stats.count();
  for (let i = 0; i < count; i++) {
    const text = await stats.nth(i).textContent();
    await expect(text).toMatch(/0|No data available/);
  }
});