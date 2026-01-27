import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-002-4 - Reject reading that deviates more than two liters from last valid reading", async ({ page }) => {
  const response = await page.request.post('/sensor/fuel', {
    data: {
      timestamp: '2026-01-17T10:15:30Z',
      voltage: 3.5
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  await expect(response.status()).toBe(400);

  const json = await response.json();
  await expect(json.status).toBe('REJECTED');
  await expect(json.error).toContain('Spike detected');
});