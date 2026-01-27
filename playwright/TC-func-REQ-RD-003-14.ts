import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-003-14 - Maintain warning state within hysteresis thresholds", async ({ page }) => {
  const response = await page.request.post('/warning/evaluate', {
    data: { estimatedRangeKm: 90 }
  });
  expect(response.ok()).toBeTruthy();
  const json = await response.json();
  expect(json.warningState).toBe('ACTIVE');
  expect(json.reason).toBe('NO_CHANGE');

  const warningActiveLocator = page.locator('[data-testid="warning-active"]');
  await expect(warningActiveLocator).toHaveText('true');
});