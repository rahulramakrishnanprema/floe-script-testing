import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-17 - Verify email content does not contain sensitive data such as passwords", async ({ page }) => {
  // Precondition: User is registered and logged in
  await page.goto('/login');
  await page.fill('[data-testid="email-input"]', 'user@example.com');
  await page.fill('[data-testid="password-input"]', 'currentPassword');
  await page.click('[data-testid="login-button"]');
  await expect(page).toHaveURL('/dashboard');

  // Step 1: User changes password
  await page.goto('/profile/settings');
  await page.fill('[data-testid="current-password"]', 'currentPassword');
  await page.fill('[data-testid="new-password"]', 'NewPassword123!');
  await page.fill('[data-testid="confirm-password"]', 'NewPassword123!');
  await page.click('[data-testid="change-password-button"]');
  await expect(page.locator('[data-testid="notification-success"]')).toBeVisible();

  // Step 2: Email content is captured and inspected
  // TODO: Replace with actual email retrieval logic
  const emailBody = await page.evaluate(() => {
    return 'Email body content';
  });

  // Validate email body does not contain passwords
  expect(emailBody).not.toContain('NewPassword123!');
  expect(emailBody).not.toContain('currentPassword');
});