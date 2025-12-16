import { test, expect } from '@playwright/test';

test('TC-func-126B1A8B6-19 - Verify email is queued for important action and processed by background job', async ({ page }) => {
  // Precondition: User is logged in
  await page.goto('/login');
  await page.locator('[data-testid="username"]').fill('testuser');
  await page.locator('[data-testid="password"]').fill('password');
  await page.locator('[data-testid="login-button"]').click();
  await expect(page.locator('[data-testid="home-page"]')).toBeVisible();

  // Navigate to account settings
  await page.goto('/account/settings');
  await expect(page.locator('[data-testid="account-settings-page"]')).toBeVisible();

  // Step 1: User initiates account deletion
  await page.locator('[data-testid="delete-account-button"]').click();
  await expect(page.locator('[data-testid="confirmation-dialog"]')).toBeVisible();
  await page.locator('[data-testid="confirm-delete-button"]').click();
  await expect(page.locator('[data-testid="email-queued-message"]')).toBeVisible();

  // Step 2: Wait for background job to process queue
  await expect(page.locator('[data-testid="email-sent-notification"]')).toBeVisible({ timeout: 60000 });
});