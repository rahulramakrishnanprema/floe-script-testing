import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-001-4 - Validate system handling of sensor out-of-range fuel quantity", async ({ page }) => {
  // Precondition: navigate to the fuel sensor page
  await page.goto('/fuel-sensor');

  // Step 1: System reads fuel quantity -5 liters
  await page.locator('[data-testid="fuel-sensor-input"]').fill('-5');
  await page.locator('[data-testid="fuel-sensor-submit"]').click();

  // Expected: Fuel quantity recorded as -5 liters
  const recordedFuel = await page.locator('[data-testid="fuel-quantity-display"]').textContent();
  expect(recordedFuel).toBe('-5');

  // Step 2: System detects out-of-range fuel quantity
  const errorMessage = await page.locator('[data-testid="fuel-error"]').textContent();
  expect(errorMessage).toContain('invalid');

  // Step 3: System sets fuel quantity to 0 liters for calculation
  const adjustedFuel = await page.locator('[data-testid="fuel-quantity-display"]').textContent();
  expect(adjustedFuel).toBe('0');

  // Step 4: System calculates estimated driving range
  const estimatedRange = await page.locator('[data-testid="estimated-range"]').textContent();
  expect(estimatedRange).toBe('0 km');

  // Step 5: System displays estimated driving range
  const displayedRange = await page.locator('[data-testid="estimated-range-display"]').textContent();
  expect(displayedRange).toBe('0 km');

  // Step 6: System checks low-fuel warning threshold
  const warningVisible = await page.locator('[data-testid="low-fuel-warning"]').isVisible();
  expect(warningVisible).toBe(false);
});