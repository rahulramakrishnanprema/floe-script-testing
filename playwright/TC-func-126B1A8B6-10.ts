import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-10 - Verify dashboard displays correct user statistics for a logged in user", async ({ page }) => {
  // Step 1: Navigate to the dashboard page
  await page.goto('https://example.com/dashboard');

  // Verify the dashboard page loads without errors
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

  // Step 2: Verify key statistics displayed
  const totalLogins = page.locator('[data-testid="total-logins"]');
  const activeSessions = page.locator('[data-testid="active-sessions"]');
  const lastActivity = page.locator('[data-testid="last-activity"]');

  await expect(totalLogins).toBeVisible();
  await expect(totalLogins).toHaveText(/\d+/);

  await expect(activeSessions).toBeVisible();
  await expect(activeSessions).toHaveText(/\d+/);

  await expect(lastActivity).toBeVisible();
  await expect(lastActivity).toHaveText(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);

  // Ensure no error messages
  await expect(page.locator('[data-testid="error-message"]')).toHaveCount(0);
});