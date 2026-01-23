import { test, expect } from '@playwright/test';

test("TC-func-1192A6A9A11FC352E-01 - Validate range calculation and low fuel warning not triggered when range exceeds 80 km with vehicle profile available", async ({ page }) => {
  await page.goto('/dashboard');

  const fuelLevelLocator = page.locator('[data-testid="fuel-level"]');
  const consumptionProfileLocator = page.locator('[data-testid="consumption-profile"]');
  const last100kmAverageLocator = page.locator('[data-testid="last-100km-average"]');

  const fuelLevelText = await fuelLevelLocator.textContent();
  const consumptionProfileText = await consumptionProfileLocator.textContent();
  const last100kmAverageText = await last100kmAverageLocator.textContent();

  expect(fuelLevelText).toBe('50');
  expect(consumptionProfileText).toBe('8.0');
  expect(last100kmAverageText).toBe('8.0');

  const fuelLevel = parseFloat(fuelLevelText || '0');
  const consumptionPer100km = parseFloat(consumptionProfileText || '0');
  const calculatedRange = (fuelLevel / consumptionPer100km) * 100;

  expect(calculatedRange).toBeCloseTo(625, 0);

  const lowFuelWarningLocator = page.locator('[data-testid="low-fuel-warning"]');
  const warningVisible = await lowFuelWarningLocator.isVisible();
  expect(warningVisible).toBe(false);

  const rangeDisplayLocator = page.locator('[data-testid="range-display"]');
  const rangeDisplayText = await rangeDisplayLocator.textContent();
  expect(rangeDisplayText).toBe('625 km');
});