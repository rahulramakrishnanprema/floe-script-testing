import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-20 - Verify notification email for password change does not contain new password", async ({ page }) => {
  const newPassword = 'NewPass123!';

  await page.goto('/profile');

  await page.locator('[data-testid="current-password-input"]').fill('CurrentPass123!');
  await page.locator('[data-testid="new-password-input"]').fill(newPassword);
  await page.locator('[data-testid="confirm-password-input"]').fill(newPassword);
  await page.locator('[data-testid="save-password-button"]').click();

  const successMessage = page.locator('[data-testid="success-message"]');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Password updated successfully');

  const emailContent = page.locator('[data-testid="email-content"]');
  await expect(emailContent).toBeVisible();
  await expect(emailContent).toContainText('Your password has been changed');
  await expect(emailContent).not.toContainText(newPassword);
});