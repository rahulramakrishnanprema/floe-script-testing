import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-18 - Verify system does not send notification email for updating profile picture", async ({ page }) => {
  // Step 1: User updates profile picture
  await page.setInputFiles('[data-testid="profile-picture-upload"]', 'tests/assets/profile.jpg');
  await page.click('[data-testid="save-profile-picture"]');
  await expect(page.locator('[data-testid="upload-success"]')).toBeVisible();

  // Step 2: Check email queue
  await page.goto('/email-queue');
  await expect(page.locator('[data-testid="email-queue-item"]')).toHaveCount(0);
});