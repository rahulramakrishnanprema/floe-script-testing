import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-05 - Verify successful login using a valid authentication token", async ({ page }) => {
  // Step 1: Enter the valid token into the token field and submit
  await page.fill('[data-testid="token-input"]', 'VALID_TOKEN');
  await page.click('[data-testid="login-submit"]');

  // Step 2: Verify that the user is redirected to the dashboard page
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  await expect(page.locator('[data-testid="user-greeting"]')).toBeVisible();
});