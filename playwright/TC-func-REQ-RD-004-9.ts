import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-004-9 - Validate that a valid consumption update is processed and the profile reflects the new data", async ({ page }) => {
  // Retrieve initial profile data
  const initialGetResponse = await page.request.get('/consumption/profile');
  expect(initialGetResponse.status()).toBe(200);
  const initialProfile = await initialGetResponse.json();
  expect(initialProfile).toHaveProperty('profileType', 'LEARNED');
  expect(initialProfile).toHaveProperty('averageConsumption');
  expect(typeof initialProfile.averageConsumption).toBe('number');
  expect(initialProfile).toHaveProperty('historyKm');
  expect(typeof initialProfile.historyKm).toBe('number');
  expect(initialProfile).toHaveProperty('fallbackAvailable', true);
  const initialHistoryKm = initialProfile.historyKm;

  // Step 1: Send POST request to update consumption
  const postResponse = await page.request.post('/consumption/profile/update', {
    data: { distanceKm: 25, fuelUsedLiters: 1.8, drivingCondition: 'CITY' },
  });
  expect(postResponse.status()).toBe(200);
  const postResult = await postResponse.json();
  expect(postResult).toHaveProperty('updated', true);
  expect(postResult).toHaveProperty('adaptationStatus', 'IN_PROGRESS');

  // Step 2: Retrieve updated profile data
  const updatedGetResponse = await page.request.get('/consumption/profile');
  expect(updatedGetResponse.status()).toBe(200);
  const updatedProfile = await updatedGetResponse.json();
  expect(updatedProfile).toHaveProperty('profileType', 'LEARNED');
  expect(updatedProfile).toHaveProperty('averageConsumption');
  expect(typeof updatedProfile.averageConsumption).toBe('number');
  expect(updatedProfile).toHaveProperty('historyKm');
  expect(typeof updatedProfile.historyKm).toBe('number');
  expect(updatedProfile.historyKm).toBe(initialHistoryKm + 25);
  expect(updatedProfile).toHaveProperty('fallbackAvailable', true);
});