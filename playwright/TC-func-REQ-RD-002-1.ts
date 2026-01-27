import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-002-1 - Valid reading within voltage range and acceptable frequency", async ({ page }) => {
  const response = await page.request.post('/sensor/fuel', {
    data: {
      timestamp: '2026-01-17T10:15:30Z',
      voltage: 3.2
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  expect(response.status()).toBe(200);

  const json = await response.json();
  expect(json.fuelQuantityLiters).toBe(38.4);
  expect(json.status).toBe('ACCEPTED');
});