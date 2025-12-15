import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-18 - Test integration with external email service for successful delivery", async ({ page }) => {
  // Navigate to the application page where the email notification can be triggered
  await page.goto('https://example.com'); // Replace with actual URL

  // Step 1: Trigger a notification email event in the system
  await page.locator('[data-testid="trigger-email"]').click();
  // Verify that the UI indicates the email trigger action has been initiated
  await expect(page.locator('[data-testid="email-triggered"]')).toBeVisible();

  // Step 2: Verify the API response status
  const [response] = await Promise.all([
    page.waitForResponse(response => 
      response.url().includes('email-service') && response.request().method() === 'POST'
    ),
    // The trigger action above already initiates the request
  ]);

  // Assert that the API response indicates a successful status
  expect(response.ok()).toBeTruthy();

  // Assert that the response body contains the expected status indicating the email is queued
  const responseBody = await response.json();
  expect(responseBody.status).toBe('queued');
});