import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-18 - Verify system handles email service failure gracefully", async ({ page }) => {
  // Precondition: User is logged in
  await page.goto('/dashboard');

  // Step 1: User performs important action that triggers email
  await page.locator('[data-testid="important-action-button"]').click();

  // Expect system attempts to send email and receives failure response
  const emailResponse = await page.waitForResponse((response) =>
    response.url().includes('/api/send-email') && response.status() === 500
  );
  expect(emailResponse).toBeTruthy();
  expect(emailResponse.status()).toBe(500);

  // Step 2: System logs error and retries or queues email
  // Expect notification to user
  const notification = page.locator('[data-testid="notification"]');
  await expect(notification).toBeVisible();
  await expect(notification).toContainText('Email will be sent later');

  // Expect error log
  const errorLog = page.locator('[data-testid="error-log"]');
  await expect(errorLog).toBeVisible();

  // Postcondition: Email queued for retry
  const retryResponse = await page.waitForResponse((response) =>
    response.url().includes('/api/queue-email') && response.status() === 200
  );
  expect(retryResponse).toBeTruthy();
  expect(retryResponse.status()).toBe(200);
});