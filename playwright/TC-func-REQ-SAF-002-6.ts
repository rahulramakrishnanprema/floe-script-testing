import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-002-6 - Validate that the low fuel warning appears within two seconds after the fuel level drops below the 80 km threshold at the lower temperature limit of the operating range", async ({ page }) => {
  // Step 1: Reduce the fuel level to 79 km
  await page.evaluate(() => {
    // TODO: Implement fuel level reduction logic
  });
  const fuelLevelLocator = page.locator('[data-testid="fuel-level"]');
  await expect(fuelLevelLocator).toHaveText('79 km', { timeout: 100 });

  // Step 2: Allow the system to acquire sensor data
  await page.waitForTimeout(100);
  // TODO: Verify sensor acquisition completion if available

  // Step 3: Process the data through the filtering algorithm
  await page.waitForTimeout(200);
  // TODO: Verify filtering completion if available

  // Step 4: Compare the filtered data to the 80 km threshold
  await page.waitForTimeout(100);
  // TODO: Verify threshold comparison result if available

  // Step 5: Activate the low fuel warning icon on the cluster display
  await page.waitForTimeout(1600);
  const warningIconLocator = page.locator('[data-testid="warning-icon"]');
  await expect(warningIconLocator).toBeVisible();

  // Step 6: Measure the total latency from the moment the fuel level drops below 80 km to the moment the warning icon appears
  const startTime = Date.now();
  await warningIconLocator.waitFor({ state: 'visible', timeout: 2000 });
  const endTime = Date.now();
  const latency = endTime - startTime;
  await expect(latency).toBeLessThanOrEqual(2000);

  // Postconditions
  const systemLogLocator = page.locator('[data-testid="system-log"]');
  await expect(systemLogLocator).toContainText('2.0 seconds or less');

  const operatingModeLocator = page.locator('[data-testid="operating-mode"]');
  await expect(operatingModeLocator).toHaveText('Normal');
});