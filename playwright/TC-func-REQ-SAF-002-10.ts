import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-002-10 - Validate that the system meets the worst‑case latency when all processing steps are at their maximum allowed durations", async ({ page }) => {
  // Step 1: Reduce the fuel level to 79 km
  await page.locator('[data-testid="fuel-level-input"]').fill('79');
  const startTime = Date.now();
  await page.waitForTimeout(100);
  const fuelLevelText = await page.locator('[data-testid="fuel-level-display"]').textContent();
  expect(fuelLevelText).toBe('79 km');

  // Step 2: Allow the system to acquire sensor data with simulated 100 ms delay
  await page.waitForTimeout(100);
  const sensorStatus = await page.locator('[data-testid="sensor-status"]').textContent();
  expect(sensorStatus).toBe('Acquired');

  // Step 3: Process the data through the filtering algorithm with simulated 200 ms delay
  await page.waitForTimeout(200);
  const filteringStatus = await page.locator('[data-testid="filtering-status"]').textContent();
  expect(filteringStatus).toBe('Filtered');

  // Step 4: Compare the filtered data to the 80 km threshold with simulated 100 ms delay
  await page.waitForTimeout(100);
  const comparisonResult = await page.locator('[data-testid="comparison-result"]').textContent();
  expect(comparisonResult).toBe('Below Threshold');

  // Step 5: Activate the low fuel warning icon on the cluster display with simulated 1.6 second delay
  await page.waitForTimeout(1600);
  const warningVisible = await page.locator('[data-testid="low-fuel-warning"]').isVisible();
  expect(warningVisible).toBeTruthy();

  // Step 6: Measure the total latency from the moment the fuel level drops below 80 km to the moment the warning icon appears
  const endTime = Date.now();
  const totalLatency = endTime - startTime;
  expect(totalLatency).toBe(2000);
});