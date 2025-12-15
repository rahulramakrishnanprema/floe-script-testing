import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-14 - Verify unauthorized user cannot export data", async ({ page }) => {
  // Step 1: Attempt to access export page via URL
  await page.goto('https://example.com/export'); // Replace with actual export URL
  const loginForm = page.locator('[data-testid="login-form"]');
  await expect(loginForm).toBeVisible();

  // Step 2: Login as a user without export rights
  await page.locator('[data-testid="username"]').fill('unauthorized_user');
  await page.locator('[data-testid="password"]').fill('password123');
  await page.locator('[data-testid="login-button"]').click();

  const userProfile = page.locator('[data-testid="user-profile"]');
  await expect(userProfile).toBeVisible();

  const exportButton = page.locator('[data-testid="export-button"]');
  await expect(exportButton).toBeHidden();

  const errorMsg = page.locator('[data-testid="error-message"]');
  await expect(errorMsg).toContainText('Access denied');
});