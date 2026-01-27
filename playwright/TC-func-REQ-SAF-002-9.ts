import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-002-9 - Confirm that the warning is issued when the fuel level is just below the threshold", async ({ page }) => {
  // Step 1: Verify the fuel level sensor reports 79.9 km
  await expect(page.locator('[data-testid="fuel-level"]')).toHaveText('79.9 km', { timeout: 100 });

  // Step 2: Allow the system to acquire sensor data
  await expect(page.locator('[data-testid="sensor-status"]')).toHaveText('acquired', { timeout: 100 });

  // Step 3: Process the data through the filtering algorithm
  await expect(page.locator('[data-testid="filter-status"]')).toHaveText('complete', { timeout: 200 });

  // Step 4: Compare the filtered data to the 80 km threshold
  await expect(page.locator('[data-testid="threshold-status"]')).toHaveText('below', { timeout: 100 });

  // Step 5 & 6: Activate the low fuel warning icon and measure latency
  const start = Date.now();
  await expect(page.locator('[data-testid="low-fuel-warning"]')).toBeVisible({ timeout: 1600 });
  const latency = Date.now() - start;
  expect(latency).toBeLessThanOrEqual(2000);
  console.log(`Total latency: ${latency} ms`);

  // Postconditions
  await expect(page.locator('[data-testid="low-fuel-warning"]')).toBeVisible();
  await expect(page.locator('[data-testid="system-log"]')).toContainText('Latency measurement: 2.0 seconds or less');
  await expect(page.locator('[data-testid="system-mode"]')).toHaveText('normal');
});