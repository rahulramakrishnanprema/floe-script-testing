import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-002-8 - Verify that the warning is triggered when the fuel level crosses the 80 km threshold exactly at the boundary", async ({ page }) => {
  // Step 1: Reduce the fuel level to 79.9 km
  await page.locator('[data-testid="fuel-level-input"]').fill('79.9');
  const startTime = Date.now();
  await expect(page.locator('[data-testid="fuel-level-display"]')).toHaveText('79.9 km', { timeout: 100 });
  const sensorEnd = Date.now();
  const sensorLatency = sensorEnd - startTime;
  expect(sensorLatency).toBeLessThanOrEqual(100);

  // Step 2: Allow the system to acquire sensor data
  await page.waitForTimeout(100);

  // Step 3: Process the data through the filtering algorithm
  await page.waitForTimeout(200);

  // Step 4: Compare the filtered data to the 80 km threshold
  await page.waitForTimeout(100);

  // Step 5: Activate the low fuel warning icon on the cluster display
  await page.waitForTimeout(1600);

  // Step 6: Measure the total latency from the moment the fuel level drops below 80 km to the moment the warning icon appears
  const warningIcon = page.locator('[data-testid="low-fuel-warning-icon"]');
  await expect(warningIcon).toBeVisible({ timeout: 2000 });
  const warningTime = Date.now();
  const totalLatency = warningTime - startTime;
  expect(totalLatency).toBeLessThanOrEqual(2000);

  // Postconditions
  await expect(warningIcon).toBeVisible();
  await expect(page.locator('[data-testid="system-log"]')).toContainText('Latency measurement: 2.0 seconds or less');
  await expect(page.locator('[data-testid="operating-mode"]')).toHaveText('Normal');
});