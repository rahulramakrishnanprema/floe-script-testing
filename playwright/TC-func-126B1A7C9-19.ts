import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-19 - Verify email content includes correct user name and action description after important action", async ({ page }) => {
  // Precondition: User is registered and logged in, User has verified email address
  await page.goto('/login');
  await page.fill('[data-testid="email-input"]', 'user@example.com');
  await page.fill('[data-testid="password-input"]', 'Password123');
  await page.click('[data-testid="login-button"]');
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

  // Step 1: Trigger important action (e.g., change password)
  await page.goto('/settings/password');
  await page.fill('[data-testid="current-password"]', 'Password123');
  await page.fill('[data-testid="new-password"]', 'NewPassword123');
  await page.fill('[data-testid="confirm-password"]', 'NewPassword123');
  await page.click('[data-testid="change-password-button"]');
  await expect(page.locator('[data-testid="success-message"]')).toContainText('Action processed successfully');

  // Step 2: Capture sent email from email service
  await page.goto('https://mail.example.com');
  await page.fill('[data-testid="email-search-input"]', 'Password Changed');
  await page.click('[data-testid="search-button"]');
  const emailSubjectLocator = page.locator('[data-testid="email-subject"]');
  await expect(emailSubjectLocator).toContainText('Password Changed');

  const emailBodyLocator = page.locator('[data-testid="email-body"]');
  await expect(emailBodyLocator).toContainText('user@example.com');
  await expect(emailBodyLocator).toContainText('Password Changed');

  // Postconditions: Email content matches template, Email logged with correct metadata
  await expect(page.locator('[data-testid="email-from"]')).toContainText('no-reply@example.com');
  await expect(page.locator('[data-testid="email-to"]')).toContainText('user@example.com');
});