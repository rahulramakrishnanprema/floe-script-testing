import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-003-12 - Activate warning when estimated range falls below activation threshold", async ({ page }) => {
  // Step 1: Send POST request to /warning/evaluate
  const response = await page.request.post('/warning/evaluate', {
    data: { estimatedRangeKm: 78 }
  });
  expect(response.ok()).toBeTruthy();
  const json = await response.json();
  expect(json.warningState).toBe('ACTIVE');
  expect(json.reason).toBe('RANGE_BELOW_ACTIVATION_THRESHOLD');

  // Step 2: Verify system warningActive true
  const warningActiveLocator = page.locator('[data-testid="TODO"]');
  const warningActiveText = await warningActiveLocator.textContent();
  expect(warningActiveText?.trim()).toBe('true');
});