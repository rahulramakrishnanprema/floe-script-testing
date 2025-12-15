import { test, expect } from '@playwright/test';

test('TC-func-126B1A7C9-07 - Verify login fails when an expired authentication token is used', async ({ page }) => {
  await page.goto('/login');

  await page.locator('[data-testid="token-input"]').fill('expired-token-12345');
  await page.locator('[data-testid="submit-button"]').click();

  const errorMessage = page.locator('[data-testid="error-message"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/token has expired/i);

  await expect(page).toHaveURL(/login/);
});