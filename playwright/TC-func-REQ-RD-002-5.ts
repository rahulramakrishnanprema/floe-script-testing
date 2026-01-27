import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-002-5 - Reject reading when sampling frequency below ten hertz", async ({ page }) => {
  const response = await page.request.post('/sensor/fuel', {
    data: {
      timestamp: '2026-01-17T10:15:31.200Z',
      voltage: 3.2
    }
  });

  expect(response.status()).toBe(400);

  const json = await response.json();

  expect(json.status).toBe('REJECTED');
  expect(json.error).toContain('Sampling frequency too low');
});