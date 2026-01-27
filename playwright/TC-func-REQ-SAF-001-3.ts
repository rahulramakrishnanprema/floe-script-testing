import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-001-3 - Validate low-fuel warning triggers when remaining range is 80 km or less", async ({ page }) => {
  // Step 1: System reads fuel quantity 6 liters
  const fuelQuantityLocator = page.locator('[data-testid="fuel-quantity"]');
  await expect(fuelQuantityLocator).toHaveText('6 liters');

  // Step 2: System reads vehicle profile consumption 7.5 L/100km
  const consumptionLocator = page.locator('[data-testid="vehicle-consumption"]');
  await expect(consumptionLocator).toHaveText('7.5 L/100km');

  // Step 3: System calculates estimated driving range
  const rangeLocator = page.locator('[data-testid="estimated-range"]');
  await expect(rangeLocator).toHaveText('80 km');

  // Step 4: System displays estimated driving range
  await expect(rangeLocator).toBeVisible();

  // Step 5: System checks low-fuel warning threshold
  const warningLocator = page.locator('[data-testid="low-fuel-warning"]');
  await expect(warningLocator).toBeVisible();
  await expect(warningLocator).toHaveText(/Low fuel warning/i);
});