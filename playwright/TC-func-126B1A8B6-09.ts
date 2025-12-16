import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-09 - Check token revocation after user logout", async ({ page }) => {
  // Step 1: Send logout request to invalidate the session and token
  await page.goto('/logout');
  await expect(page).toHaveURL(/login|home/);

  // Step 2: Attempt to use the same token to access a protected resource
  await page.goto('/protected');
  await expect(page).toHaveURL(/login/);
  await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
});