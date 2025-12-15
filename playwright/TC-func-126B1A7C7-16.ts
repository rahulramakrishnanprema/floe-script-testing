import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-16 - Ensure no notification email is sent for non-important user actions", async ({ page }) => {
  // Precondition: user is already logged in

  // Step 1: The user updates a non-critical profile setting
  await page.goto('https://example.com/profile');
  await page.locator('[data-testid="non-critical-setting"]').fill('New Value');
  await page.locator('[data-testid="save-profile"]').click();

  // Expected: The system processes the update without triggering an email event
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();

  // Step 2: Check the sent email logs for new entries
  await page.goto('https://example.com/email-logs');

  // Expected: No new email record appears in the logs
  await expect(page.locator('[data-testid="email-entry"]')).toHaveCount(0);
});