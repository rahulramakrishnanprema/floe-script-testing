import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-09 - Verify that the dashboard displays correct key user statistics after login", async ({ page }) => {
  // Step 1: Navigate to the dashboard page
  await page.goto('/dashboard');
  const dashboard = page.locator('[data-testid="dashboard"]');
  await expect(dashboard).toBeVisible();

  // Step 2: Verify the displayed statistics match the backend data
  const stat1 = page.locator('[data-testid="stat-1"]');
  await expect(stat1).toBeVisible();
  const stat1Value = await stat1.textContent();
  expect(stat1Value).toBe('TODO');

  // Step 3: Refresh the dashboard
  await page.reload();
  const stat1Updated = page.locator('[data-testid="stat-1"]');
  await expect(stat1Updated).toBeVisible();
  const stat1UpdatedValue = await stat1Updated.textContent();
  expect(stat1UpdatedValue).toBe('TODO');

  // Postconditions: No error messages and user remains logged in
  const errorMsg = page.locator('[data-testid="error"]');
  await expect(errorMsg).toHaveCount(0);

  const userAvatar = page.locator('[data-testid="user-avatar"]');
  await expect(userAvatar).toBeVisible();
});