import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-001-1 - Normal fuel level with vehicle profile available and range above warning threshold", async ({ page }) => {
  // Step 1: System reads fuel quantity from sensor
  const fuelQuantityLocator = page.locator('[data-testid="fuel-quantity"]');
  await expect(fuelQuantityLocator).toHaveText('30 L');

  // Step 2: System retrieves vehicle profile consumption 8 L/100km
  const consumptionLocator = page.locator('[data-testid="vehicle-consumption"]');
  await expect(consumptionLocator).toHaveText('8 L/100km');

  // Step 3: System calculates remaining range using formula range equals fuel quantity divided by consumption times 100
  const remainingRangeLocator = page.locator('[data-testid="remaining-range"]');
  await expect(remainingRangeLocator).toHaveText('375 km');

  // Step 4: System compares remaining range to 80 km threshold
  const lowFuelWarningLocator = page.locator('[data-testid="low-fuel-warning"]');
  await expect(lowFuelWarningLocator).toBeHidden();
});