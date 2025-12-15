import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-17 - Verify that notification emails do not expose sensitive data", async ({ page }) => {
  await page.goto('https://example.com');

  // Step 1: The user initiates a password reset
  await page.click('[data-testid="forgot-password-link"]');
  await page.fill('[data-testid="email-input"]', 'user@example.com');
  await page.click('[data-testid="submit-reset"]');

  // Expected: The system generates a reset token and sends a notification email
  const notification = page.locator('[data-testid="notification-message"]');
  await expect(notification).toHaveText(/Email sent/i);

  // Step 2: Inspect the email content
  await page.goto('https://example.com/test-email-preview?to=user@example.com&subject=Password%20Reset');

  // Expected: The email contains only a reset link and does not reveal the password or the token
  const emailBody = page.locator('[data-testid="email-body"]');
  await expect(emailBody).toContainText('Reset your password');
  await expect(emailBody).not.toContainText('Password');
  await expect(emailBody).not.toContainText('token');

  const resetLink = emailBody.locator('a[href*="reset-password"]');
  await expect(resetLink).toBeVisible();
});