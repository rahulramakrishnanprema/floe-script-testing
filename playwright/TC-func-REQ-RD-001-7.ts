import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-001-7 - Validate GET consumption profile endpoint returns correct data", async ({ page }) => {
  const response = await page.request.get('/consumption/profile');
  await expect(response).toBeOK();
  const json = await response.json();
  await expect(json.profileType).toBe('LEARNED');
  await expect(json.averageConsumption).toBe(6.9);
  await expect(json.historyKm).toBe(10000);
  await expect(json.fallbackAvailable).toBe(true);
});