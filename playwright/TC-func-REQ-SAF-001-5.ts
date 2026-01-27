import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-001-5 - Validate calculation when less than 100 km of driving data is available", async ({ page }) => {
  // Step 1: System reads fuel quantity 20 liters
  const fuelQuantity = await page.locator('[data-testid="fuel-quantity"]').textContent();
  expect(fuelQuantity).toBe('20 liters');

  // Step 2: System reads vehicle profile consumption 6.0 L/100km
  const vehicleConsumption = await page.locator('[data-testid="vehicle-consumption"]').textContent();
  expect(vehicleConsumption).toBe('6.0 L/100km');

  // Step 3: System attempts to calculate average consumption over last 100 km but only 50 km data available
  const dataUsed = await page.locator('[data-testid="data-used"]').textContent();
  expect(dataUsed).toBe('50 km');

  // Step 4: System calculates estimated driving range
  const estimatedRangeRaw = await page.locator('[data-testid="estimated-range"]').textContent();
  expect(estimatedRangeRaw).toBe('333.33 km');

  // Step 5: System displays estimated driving range
  const displayedRange = await page.locator('[data-testid="displayed-range"]').textContent();
  expect(displayedRange).toBe('333 km');

  // Step 6: System checks low-fuel warning threshold
  const lowFuelWarningVisible = await page.locator('[data-testid="low-fuel-warning"]').isVisible();
  expect(lowFuelWarningVisible).toBe(false);
});