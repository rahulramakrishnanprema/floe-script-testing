import { test, expect } from '@playwright/test';

test('TC-func-126B1A7C9-13 - Verify dashboard reflects updated statistics after new user registration', async ({ page }) => {
  // Capture initial total user count from the dashboard
  const totalUsersLocator = page.locator('[data-testid="total-users"]');
  const initialCountText = await totalUsersLocator.textContent();
  const initialCount = parseInt(initialCountText ?? '0', 10);

  // Navigate to sign-up form (assumed to be accessible via a link/button)
  await page.locator('[data-testid="signup-link"]').click();

  // Fill out the sign-up form
  await page.locator('[data-testid="signup-username"]').fill('testuser123');
  await page.locator('[data-testid="signup-email"]').fill('testuser123@example.com');
  await page.locator('[data-testid="signup-password"]').fill('Password123!');
  await page.locator('[data-testid="signup-submit"]').click();

  // Verify that a new user record was created (success message appears)
  await expect(page.locator('[data-testid="signup-success"]')).toBeVisible();

  // Wait for redirection back to the dashboard or refresh of statistics
  await page.waitForSelector('[data-testid="dashboard"]');

  // Verify that the dashboard now shows an updated total user count incremented by one
  await expect(totalUsersLocator).toHaveText(/\d+/);
  const updatedCountText = await totalUsersLocator.textContent();
  const updatedCount = parseInt(updatedCountText ?? '0', 10);
  expect(updatedCount).toBe(initialCount + 1);
});