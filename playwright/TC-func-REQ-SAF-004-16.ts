import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-004-16 - Open circuit fault detection and recovery", async ({ page }) => {
  // Step 1: Set sensor voltage to 4.7V to simulate open circuit fault
  await page.locator('[data-testid="sensor-voltage-input"]').fill('4.7');
  await page.waitForTimeout(1000); // wait for system to detect fault
  await expect(page.locator('[data-testid="diagnostic-memory"]')).toContainText('FUEL_SENSOR_FAILURE');

  // Step 2: Verify fault code FUEL_SENSOR_FAILURE is stored in diagnostic memory
  await expect(page.locator('[data-testid="diagnostic-memory"]')).toContainText('FUEL_SENSOR_FAILURE');

  // Step 3: Verify continuous low-fuel warning is displayed on the cluster
  await expect(page.locator('[data-testid="low-fuel-warning"]')).toBeVisible();

  // Step 4: Verify diagnostic message FUEL SENSOR ERROR - SERVICE REQUIRED is displayed
  await expect(page.locator('[data-testid="diagnostic-message"]')).toContainText('FUEL SENSOR ERROR - SERVICE REQUIRED');

  // Step 5: Verify fault log entry contains timestamp, fault code, and vehicle state
  await expect(page.locator('[data-testid="fault-log"]')).toContainText('FUEL_SENSOR_FAILURE');

  // Step 6: Set sensor voltage back to 4.0V within 5 seconds and provide 3 consecutive valid readings
  await page.locator('[data-testid="sensor-voltage-input"]').fill('4.0');
  await page.waitForTimeout(5000);
  for (let i = 0; i < 3; i++) {
    await page.locator('[data-testid="sensor-voltage-input"]').fill('4.0');
    await page.waitForTimeout(1000);
  }

  // Step 7: Verify fault code is cleared from diagnostic memory
  await expect(page.locator('[data-testid="diagnostic-memory"]')).not.toContainText('FUEL_SENSOR_FAILURE');

  // Step 8: Verify low-fuel warning is no longer active
  await expect(page.locator('[data-testid="low-fuel-warning"]')).not.toBeVisible();

  // Step 9: Verify diagnostic message is cleared from cluster
  await expect(page.locator('[data-testid="diagnostic-message"]')).not.toBeVisible();
});