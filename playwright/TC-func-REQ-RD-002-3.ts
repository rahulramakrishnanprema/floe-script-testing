import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-002-3 - Reject reading with voltage above maximum range", async ({ page }) => {
  const response = await page.request.post('/sensor/fuel', {
    data: {
      timestamp: '2026-01-17T10:15:30Z',
      voltage: 4.6
    }
  });

  expect(response.status()).toBe(400);

  const json = await response.json();
  expect(json.status).toBe('REJECTED');
  expect(json.error).toContain('Voltage out of range');
});