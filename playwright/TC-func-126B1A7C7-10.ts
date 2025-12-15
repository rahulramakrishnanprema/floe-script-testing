import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-10 - Verify dashboard handles scenario where no user data is present", async ({ page }) => {
  // Step 1: Navigate to the dashboard page
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

  // Step 2: Verify that statistics display zero values
  const statTotalUsers = page.locator('[data-testid="stat-total-users"]');
  const statActiveUsers = page.locator('[data-testid="stat-active-users"]');
  const statInactiveUsers = page.locator('[data-testid="stat-inactive-users"]');
  await expect(statTotalUsers).toHaveText('0');
  await expect(statActiveUsers).toHaveText('0');
  await expect(statInactiveUsers).toHaveText('0');

  // Step 3: Check for absence of error messages
  await expect(page.locator('[data-testid="error-message"]')).toHaveCount(0);
});