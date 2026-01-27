import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-003-16 - Handle missing estimatedRange in evaluate request", async ({ page }) => {
  // Get current warningActive state
  const statusBeforeResponse = await page.request.get('/warning/status');
  expect(statusBeforeResponse.ok()).toBeTruthy();
  const statusBefore = await statusBeforeResponse.json();
  const beforeActive = statusBefore.warningActive;

  // Send POST request with empty body
  const response = await page.request.post('/warning/evaluate', {
    data: {}
  });
  expect(response.status()).toBe(400);
  const errorBody = await response.json();
  expect(errorBody.message).toContain('missing estimatedRange');

  // Verify warningActive unchanged
  const statusAfterResponse = await page.request.get('/warning/status');
  expect(statusAfterResponse.ok()).toBeTruthy();
  const statusAfter = await statusAfterResponse.json();
  expect(statusAfter.warningActive).toBe(beforeActive);
});