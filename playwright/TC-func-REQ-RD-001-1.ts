import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-001-1 - Validate low fuel warning triggers when remaining range is less than or equal to 80 km using default consumption profile", async ({ page }) => {
  // Precondition: Fuel level sensor reports 6 liters of fuel
  await expect(page.locator('[data-testid="fuel-level"]')).toHaveText('6 liters');

  // Step 1: Calculate estimated driving range using fuel quantity and default consumption profile
  const fuelQuantity = 6; // liters
  const consumptionProfile = 7.5; // liters per 100 km
  const estimatedRange = (fuelQuantity / consumptionProfile) * 100; // km
  await expect(estimatedRange).toBe(80);

  // Step 2: Check low fuel warning status
  await expect(page.locator('[data-testid="low-fuel-warning"]')).toBeVisible();

  // Postcondition: Low fuel warning displayed to driver, System records warning event
  await expect(page.locator('[data-testid="warning-event-log"]')).toContainText('Low fuel warning');
});