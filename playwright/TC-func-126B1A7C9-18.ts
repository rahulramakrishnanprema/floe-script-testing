import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-18 - Verify that no notification email is sent for non-important user action such as profile picture update", async ({ page }) => {
  // Step 1: Navigate to profile page
  await page.goto('/profile');
  const profilePage = page.locator('[data-testid="profile-page"]');
  await expect(profilePage).toBeVisible();

  // Step 2: Upload new profile picture
  const uploadInput = page.locator('[data-testid="profile-picture-upload"]');
  await uploadInput.setInputFiles('tests/assets/new-profile-pic.jpg');
  const uploadSuccess = page.locator('[data-testid="upload-success"]');
  await expect(uploadSuccess).toBeVisible();

  // Step 3: Check inbox for notification email
  const emailList = page.locator('[data-testid="email-list"]');
  await expect(emailList).toHaveCount(0, { timeout: 120000 });
});