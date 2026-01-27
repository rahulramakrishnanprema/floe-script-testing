import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-001-1 - Validate normal fuel range calculation without warning when remaining range exceeds threshold", async ({ page }) => {
  // Step 1: System reads current fuel quantity from sensor
  const fuelQuantityText = await page.locator('[data-testid="fuel-quantity"]').textContent();
  expect(fuelQuantityText).toBe('30 liters');

  // Step 2: System reads vehicle consumption profile from ECU
  const consumptionText = await page.locator('[data-testid="fuel-consumption"]').textContent();
  expect(consumptionText).toBe('8 L/100km');

  // Step 3: System calculates remaining range
  const fuelQuantity = parseFloat(fuelQuantityText?.replace(' liters', '')) ?? 0;
  const consumption = parseFloat(consumptionText?.replace(' L/100km', '')) ?? 0;
  const calculatedRange = (fuelQuantity / consumption) * 100;
  expect(calculatedRange).toBe(375);

  const displayedRangeText = await page.locator('[data-testid="remaining-range"]').textContent();
  expect(displayedRangeText).toBe('375 km');

  // Step 4: System compares remaining range to 80 km threshold
  const threshold = 80;
  const isLowFuel = calculatedRange < threshold;
  expect(isLowFuel).toBe(false);

  // Postconditions
  expect(displayedRangeText).toBe('375 km');
  const warningLocator = page.locator('[data-testid="low-fuel-warning"]');
  await expect(warningLocator).not.toBeVisible();
});