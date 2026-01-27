import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-001-2 - Validate use of default consumption profile when vehicle profile is missing", async ({ page }) => {
  // Step 1: System reads fuel quantity 30 liters
  const fuelQuantityLocator = page.locator('[data-testid="fuel-quantity"]');
  await expect(fuelQuantityLocator).toHaveText('30 liters');

  // Step 2: System checks for vehicle profile and does not find one
  const vehicleProfileLocator = page.locator('[data-testid="vehicle-profile"]');
  await expect(vehicleProfileLocator).toHaveText('Vehicle profile missing');

  // Step 3: System uses default consumption profile of 7.5 L/100km
  const consumptionProfileLocator = page.locator('[data-testid="consumption-profile"]');
  await expect(consumptionProfileLocator).toHaveText('7.5 L/100km');

  // Step 4: System calculates estimated driving range
  const estimatedRangeLocator = page.locator('[data-testid="estimated-range"]');
  await expect(estimatedRangeLocator).toHaveText('400 km');

  // Step 5: System displays estimated driving range
  await expect(estimatedRangeLocator).toBeVisible();

  // Step 6: System checks low-fuel warning threshold
  const lowFuelWarningLocator = page.locator('[data-testid="low-fuel-warning"]');
  await expect(lowFuelWarningLocator).toBeHidden();
});