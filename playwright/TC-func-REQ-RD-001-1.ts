import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-001-1 - Test calculation with vehicle profile available", async ({ page }) => {
  await page.goto('http://localhost');

  // Step 1: System reads fuel quantity from sensor
  const fuelQuantity = await page.locator('[data-testid="fuel-quantity"]').textContent();
  expect(fuelQuantity).toBe('50 liters');

  // Step 2: System reads vehicle profile consumption
  const vehicleConsumption = await page.locator('[data-testid="vehicle-consumption"]').textContent();
  expect(vehicleConsumption).toBe('8.0 L/100km');

  // Step 3: System calculates average consumption over last 100 km
  const avgConsumption = await page.locator('[data-testid="average-consumption"]').textContent();
  expect(avgConsumption).toBe('8.0 L/100km');

  // Step 4: System calculates estimated range
  const estimatedRange = await page.locator('[data-testid="estimated-range"]').textContent();
  expect(estimatedRange).toBe('625 km');

  // Step 5: System compares estimated range to 80 km threshold
  const warningVisible = await page.locator('[data-testid="low-fuel-warning"]').isVisible();
  expect(warningVisible).toBe(false);

  // Step 6: Fuel sensor reports 6 liters
  await page.locator('[data-testid="fuel-sensor"]').fill('6');
  const fuelQuantityAfter = await page.locator('[data-testid="fuel-quantity"]').textContent();
  expect(fuelQuantityAfter).toBe('6 liters');

  // Step 7: System recalculates estimated range
  const estimatedRangeAfter = await page.locator('[data-testid="estimated-range"]').textContent();
  expect(estimatedRangeAfter).toBe('75 km');

  // Step 8: System triggers low-fuel warning
  const warningVisibleAfter = await page.locator('[data-testid="low-fuel-warning"]').isVisible();
  expect(warningVisibleAfter).toBe(true);
});