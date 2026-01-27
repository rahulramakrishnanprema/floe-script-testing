import { test, expect } from '@playwright/test';

test('TC-func-REQ-RD-002-2 - Reject reading with voltage below minimum range', async ({ page }) => {
  const response = await page.request.post('/sensor/fuel', {
    data: {
      timestamp: '2026-01-17T10:15:30Z',
      voltage: 0.4
    }
  });

  expect(response.status()).toBe(400);

  const json = await response.json();

  expect(json.status).toBe('REJECTED');
  expect(json.error).toContain('Voltage out of range');
});