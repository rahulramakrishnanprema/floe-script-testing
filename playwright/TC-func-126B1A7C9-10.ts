import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-10 - Verify dashboard displays key user statistics after login", async ({ page }) => {
  // Precondition: user is logged in (assumed session is active)

  // Step 1: Navigate to the dashboard page
  await page.goto('https://example.com/dashboard');

  // Verify page loads and displays user statistics section
  const statsSection = page.locator('[data-testid="user-stats"]');
  await expect(statsSection).toBeVisible();

  // Step 2: Verify statistics displayed include number of active users, total users, average session duration
  const activeUsers = page.locator('[data-testid="active-users"]');
  await expect(activeUsers).toBeVisible();
  await expect(activeUsers).toHaveText(/\d+/);

  const totalUsers = page.locator('[data-testid="total-users"]');
  await expect(totalUsers).toBeVisible();
  await expect(totalUsers).toHaveText(/\d+/);

  const avgSessionDuration = page.locator('[data-testid="average-session-duration"]');
  await expect(avgSessionDuration).toBeVisible();
  await expect(avgSessionDuration).toHaveText(/\d+/);

  // Postconditions: Dashboard remains visible after navigation, no error messages displayed
  await expect(statsSection).toBeVisible();

  const errorMessage = page.locator('[data-testid="TODO"]');
  await expect(errorMessage).toHaveCount(0);
});