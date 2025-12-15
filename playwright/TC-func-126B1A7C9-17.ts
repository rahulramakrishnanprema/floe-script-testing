import { test, expect } from '@playwright/test';

test('TC-func-126B1A7C9-17 - Verify that notification email is sent when user changes password', async ({ page }) => {
  // Step 1: Navigate to account settings
  await page.goto('/account/settings');
  const accountHeader = page.locator('[data-testid="account-header"]');
  await expect(accountHeader).toBeVisible();

  // Step 2: Enter current password and new password
  const currentPasswordInput = page.locator('[data-testid="current-password"]');
  const newPasswordInput = page.locator('[data-testid="new-password"]');
  const confirmPasswordInput = page.locator('[data-testid="confirm-password"]');
  await currentPasswordInput.fill('OldPassword123!');
  await newPasswordInput.fill('NewPassword123!');
  await confirmPasswordInput.fill('NewPassword123!');
  await expect(currentPasswordInput).toHaveValue('OldPassword123!');
  await expect(newPasswordInput).toHaveValue('NewPassword123!');

  // Step 3: Submit password change
  const submitButton = page.locator('[data-testid="submit-password-change"]');
  await submitButton.click();
  const successMessage = page.locator('[data-testid="password-change-success"]');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Password updated');

  // Step 4: Check inbox for notification email
  const emailSubject = page.locator('[data-testid="TODO"]');
  await expect(emailSubject).toBeVisible();
  await expect(emailSubject).toContainText('Password Changed');
  const emailBody = page.locator('[data-testid="TODO"]');
  await expect(emailBody).toContainText('User Name');
});