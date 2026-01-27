import { test, expect } from '@playwright/test';

test('TC-func-REQ-RD-004-10 - Verify that the system rejects a consumption update with negative distance', async ({ page }) => {
  // Retrieve initial consumption profile
  const initialResponse = await page.request.get('/consumption/profile');
  expect(initialResponse.status()).toBe(200);
  const initialData = await initialResponse.json();
  const initialHistoryKm = initialData.historyKm;

  // Attempt to update consumption with negative distance
  const postResponse = await page.request.post('/consumption/profile/update', {
    data: { distanceKm: -5, fuelUsedLiters: 1.8, drivingCondition: 'CITY' }
  });
  expect(postResponse.status()).toBe(400);
  const postData = await postResponse.json();
  expect(postData.message).toContain('invalid distance');

  // Verify that the consumption profile remains unchanged
  const finalResponse = await page.request.get('/consumption/profile');
  expect(finalResponse.status()).toBe(200);
  const finalData = await finalResponse.json();
  expect(finalData.historyKm).toBe(initialHistoryKm);
});