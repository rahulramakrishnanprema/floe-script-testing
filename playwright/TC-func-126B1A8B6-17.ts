import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-17 - Verify notification email is sent when user changes password", async ({ page }) => {
  // Assume user is logged in
  await page.goto('/account/settings');

  // Step 1: Change password
  await page.fill('[data-testid="current-password"]', 'OldPassword123!');
  await page.fill('[data-testid="new-password"]', 'NewPassword123!');
  await page.fill('[data-testid="confirm-new-password"]', 'NewPassword123!');
  await page.click('[data-testid="save-password-button"]');
  const successMsg = page.locator('[data-testid="password-success-message"]');
  await expect(successMsg).toHaveText('Password updated successfully');

  // Step 2: Verify email sent
  await page.waitForResponse(response => response.url().includes('/api/send-email') && response.status() === 200);

  // Navigate to inbox (placeholder)
  await page.goto('/inbox');
  const emailSubject = page.locator('[data-testid="email-subject"]', { hasText: 'Password changed' });
  await expect(emailSubject).toBeVisible();

  const emailBody = page.locator('[data-testid="email-body"]');
  await expect(emailBody).toContainText('Your password has been changed successfully.');

  // Check confirmation link
  const confirmationLink = page.locator('[data-testid="confirmation-link"]');
  await expect(confirmationLink).toHaveAttribute('href', /\/confirm-password-change\/.+/);
});