import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-001-8 - Validate GET range estimate endpoint calculates remaining range correctly", async ({ page }) => {
  const response = await page.request.get('/range/estimate');
  expect(response.status()).toBe(200);
  const json = await response.json();
  expect(json.fuelRemainingLiters).toBe(8.5);
  expect(json.averageConsumption).toBe(7.1);
  expect(json.estimatedRangeKm).toBe(85);
  expect(json.calculationBasis).toBe('LAST_100_KM');
});