import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-15 - Verify notification email is sent when user changes password", async ({ page }) => {
  await page.goto('/account/settings');
  await page.fill('[data-testid="current-password"]', 'oldPassword');
  await page.fill('[data-testid="new-password"]', 'newPassword');
  await page.fill('[data-testid="confirm-password"]', 'newPassword');
  await page.click('[data-testid="change-password-submit"]');
  const successMessage = page.locator('[data-testid="password-change-success"]');
  await expect(successMessage).toBeVisible();
  const emailSubject = await page.locator('[data-testid="TODO"]').textContent();
  await expect(emailSubject).toContain('Password Changed');
  const emailBody = await page.locator('[data-testid="TODO"]').textContent();
  await expect(emailBody).toContain('Your password has been changed');
});