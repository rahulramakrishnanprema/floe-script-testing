import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-004-17 - Short circuit fault detection and recovery", async ({ page }) => {
  // Precondition: Vehicle system powered on and in normal operation, Fuel sensor connected and providing valid voltage 4.0V, Vehicle speed set to 25 km/h
  // Assume preconditions are already met.

  // Step 1: Set sensor voltage to 0.3V to simulate short circuit fault
  await page.locator('[data-testid="sensor-voltage-input"]').fill('0.3');
  await page.locator('[data-testid="sensor-voltage-submit"]').click();
  // Expect system detects voltage below 0.4V and activates fault detection
  const faultDetection = page.locator('[data-testid="fault-detection-status"]');
  await expect(faultDetection).toContainText('Fault detected');

  // Step 2: Verify fault code FUEL_SENSOR_FAILURE is stored
  const faultCodeList = page.locator('[data-testid="fault-code-list"]');
  await expect(faultCodeList).toContainText('FUEL_SENSOR_FAILURE');

  // Step 3: Verify continuous low-fuel warning is displayed
  const lowFuelWarning = page.locator('[data-testid="low-fuel-warning"]');
  await expect(lowFuelWarning).toBeVisible();

  // Step 4: Verify diagnostic message FUEL SENSOR ERROR - SERVICE REQUIRED is displayed
  const diagnosticMessage = page.locator('[data-testid="diagnostic-message"]');
  await expect(diagnosticMessage).toContainText('FUEL SENSOR ERROR - SERVICE REQUIRED');

  // Step 5: Verify fault log entry contains timestamp, fault code, and vehicle state
  const faultLog = page.locator('[data-testid="fault-log"]');
  await expect(faultLog).toContainText('FUEL_SENSOR_FAILURE');
  await expect(faultLog).toContainText('Timestamp');
  await expect(faultLog).toContainText('Vehicle state');

  // Step 6: Set sensor voltage back to 4.0V within 5 seconds and provide 3 consecutive valid readings
  await page.locator('[data-testid="sensor-voltage-input"]').fill('4.0');
  await page.locator('[data-testid="sensor-voltage-submit"]').click();
  await page.waitForTimeout(5000);
  for (let i = 0; i < 3; i++) {
    await page.locator('[data-testid="sensor-voltage-input"]').fill('4.0');
    await page.locator('[data-testid="sensor-voltage-submit"]').click();
    await page.waitForTimeout(1000);
  }
  // Expect system clears fault
  await expect(faultDetection).toContainText('No fault');

  // Step 7: Verify fault code cleared
  await expect(faultCodeList).not.toContainText('FUEL_SENSOR_FAILURE');

  // Step 8: Verify low-fuel warning inactive
  await expect(lowFuelWarning).not.toBeVisible();

  // Step 9: Verify diagnostic message cleared
  await expect(diagnosticMessage).not.toBeVisible();
});