import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-002-6 - Accept readings at voltage boundaries 0.5V and 4.5V", async ({ page }) => {
  // Step 1
  const response1 = await page.request.post('/sensor/fuel', {
    data: { timestamp: '2026-01-17T10:15:30Z', voltage: 0.5 }
  });
  expect(response1.status()).toBe(200);
  const json1 = await response1.json();
  expect(json1.fuelQuantityLiters).toBe(6.0);
  expect(json1.status).toBe('ACCEPTED');

  // Step 2
  const response2 = await page.request.post('/sensor/fuel', {
    data: { timestamp: '2026-01-17T10:15:31Z', voltage: 4.5 }
  });
  expect(response2.status()).toBe(200);
  const json2 = await response2.json();
  expect(json2.fuelQuantityLiters).toBe(54.0);
  expect(json2.status).toBe('ACCEPTED');
});