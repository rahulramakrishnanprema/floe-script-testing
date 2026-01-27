import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-004-20 - Fault recovery within 5 seconds after sensor returns to valid range with 3 consecutive readings", async ({ page }) => {
  // Precondition: Vehicle system powered on, sensor voltage 4.0V, speed 25 km/h
  const sensorVoltageInput = page.locator('[data-testid="sensor-voltage-input"]');
  const speedInput = page.locator('[data-testid="speed-input"]');
  const faultIndicator = page.locator('[data-testid="fault-indicator"]');
  const faultCode = page.locator('[data-testid="fault-code"]');
  const warningIndicator = page.locator('[data-testid="warning-indicator"]');
  const lowFuelWarning = page.locator('[data-testid="low-fuel-warning"]');
  const diagnosticMessage = page.locator('[data-testid="diagnostic-message"]');

  await sensorVoltageInput.fill('4.0');
  await speedInput.fill('25');
  await page.waitForTimeout(500);

  // Step 1: Set sensor voltage to 4.7V to trigger open circuit fault
  await sensorVoltageInput.fill('4.7');
  await page.waitForTimeout(500);

  // Expected: Fault activated
  await expect(faultIndicator).toBeVisible();
  await expect(faultIndicator).toContainText('Fault activated');

  // Step 2: Verify fault code stored and warning active
  await expect(faultCode).toBeVisible();
  await expect(faultCode).toContainText('Open Circuit Fault');
  await expect(warningIndicator).toBeVisible();
  await expect(warningIndicator).toContainText('Active');

  // Step 3: Set sensor voltage back to 4.0V within 3 seconds and provide 3 consecutive valid readings
  await sensorVoltageInput.fill('4.0');
  await page.waitForTimeout(1000);
  await sensorVoltageInput.fill('4.0');
  await page.waitForTimeout(1000);
  await sensorVoltageInput.fill('4.0');
  await page.waitForTimeout(1000);

  // Expected: System validates readings and clears fault
  await expect(faultIndicator).toBeHidden();

  // Step 4: Verify fault code cleared
  await expect(faultCode).toBeHidden();

  // Step 5: Verify low-fuel warning inactive
  await expect(lowFuelWarning).toBeHidden();

  // Step 6: Verify diagnostic message cleared
  await expect(diagnosticMessage).toBeHidden();
});