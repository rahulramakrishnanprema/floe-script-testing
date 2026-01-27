import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-001-1 - Validate normal range calculation with vehicle profile available", async ({ page }) => {
  // Step 1: System reads fuel quantity 50 liters
  const fuelQuantityLocator = page.locator('[data-testid="fuel-quantity"]');
  await expect(fuelQuantityLocator).toHaveText('50 liters');

  // Step 2: System reads vehicle profile consumption 6.0 L/100km
  const vehicleConsumptionLocator = page.locator('[data-testid="vehicle-consumption"]');
  await expect(vehicleConsumptionLocator).toHaveText('6.0 L/100km');

  // Step 3: System reads last 100 km average consumption 6.0 L/100km
  const averageConsumptionLocator = page.locator('[data-testid="average-consumption"]');
  await expect(averageConsumptionLocator).toHaveText('6.0 L/100km');

  // Step 4: System calculates estimated driving range
  const calculateButtonLocator = page.locator('[data-testid="calculate-range"]');
  await calculateButtonLocator.click();

  // Step 5: System displays estimated driving range
  const estimatedRangeLocator = page.locator('[data-testid="estimated-range"]');
  await expect(estimatedRangeLocator).toHaveText('833 km');

  // Step 6: System checks low-fuel warning threshold
  const lowFuelWarningLocator = page.locator('[data-testid="low-fuel-warning"]');
  await expect(lowFuelWarningLocator).toHaveCount(0);
});