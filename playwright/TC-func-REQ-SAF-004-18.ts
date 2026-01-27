import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-004-18 - Stuck-at-value fault detection when sensor unchanged for >30s at speed >20 km/h", async ({ page }) => {
  const sensorVoltageLocator = page.locator('[data-testid="sensor-voltage"]');
  await sensorVoltageLocator.fill('2.5');
  await page.waitForTimeout(31000);
  await expect(sensorVoltageLocator).toHaveText('2.5');

  const faultCodeLocator = page.locator('[data-testid="fault-code"]');
  await expect(faultCodeLocator).toHaveText(/FUEL_SENSOR_FAILURE/);

  const lowFuelWarningLocator = page.locator('[data-testid="low-fuel-warning"]');
  await expect(lowFuelWarningLocator).toBeVisible();

  const diagnosticMessageLocator = page.locator('[data-testid="diagnostic-message"]');
  await expect(diagnosticMessageLocator).toHaveText(/FUEL SENSOR ERROR - SERVICE REQUIRED/);

  const faultLogLocator = page.locator('[data-testid="fault-log"]');
  await expect(faultLogLocator).toContainText('FUEL_SENSOR_FAILURE');

  await sensorVoltageLocator.fill('2.5');
  await page.waitForTimeout(5000);
  for (let i = 0; i < 3; i++) {
    await sensorVoltageLocator.fill('2.5');
    await page.waitForTimeout(1000);
  }

  await expect(faultCodeLocator).toHaveText('');

  await expect(lowFuelWarningLocator).toBeHidden();

  await expect(diagnosticMessageLocator).toBeHidden();
});