import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-001-1 - Validate range calculation with vehicle profile and normal driving conditions", async ({ page }) => {
  // Step 1: Read current fuel quantity from sensor
  const fuelQuantityText = await page.locator('[data-testid="fuel-quantity"]').textContent();
  expect(fuelQuantityText).toContain('50');

  // Step 2: Retrieve vehicle consumption profile from ECU
  const consumptionProfileText = await page.locator('[data-testid="vehicle-consumption"]').textContent();
  expect(consumptionProfileText).toContain('6.0');

  // Step 3: Calculate estimated range
  const fuel = parseFloat(fuelQuantityText ?? '0');
  const consumption = parseFloat(consumptionProfileText ?? '0');
  const estimatedRange = (fuel / consumption) * 100;
  expect(estimatedRange).toBeCloseTo(833.33, 2);

  // Verify displayed estimated range
  const displayedRangeText = await page.locator('[data-testid="estimated-range"]').textContent();
  expect(displayedRangeText).toContain('833');

  // Step 4: Check if remaining range <= 80 km
  const isLowRange = estimatedRange <= 80;
  expect(isLowRange).toBe(false);

  // Verify no low fuel warning shown
  const warningVisible = await page.locator('[data-testid="low-fuel-warning"]').isVisible();
  expect(warningVisible).toBe(false);
});