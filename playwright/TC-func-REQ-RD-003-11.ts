import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-003-11 - Validate that GET /warning/status returns correct warning status and thresholds", async ({ page }) => {
  const response = await page.request.get('/warning/status');
  expect(response.status()).toBe(200);
  const json = await response.json();
  expect(json.warningActive).toBe(true);
  expect(json.activationThresholdKm).toBe(80);
  expect(json.deactivationThresholdKm).toBe(120);
  expect(json.currentRangeKm).toBe(75);
});