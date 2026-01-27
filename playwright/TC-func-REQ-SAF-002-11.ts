import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-002-11 - Ensure that an out‑of‑range sensor reading does not trigger a false low fuel warning", async ({ page }) => {
  // Step 1: Force the fuel level sensor to output -999 km
  await page.locator('[data-testid="sensor-value"]').fill('-999');
  await expect(page.locator('[data-testid="sensor-value"]')).toHaveText('-999', { timeout: 100 });

  // Step 2: Allow the system to acquire sensor data
  await expect(page.locator('[data-testid="sensor-acquisition-status"]')).toHaveText('complete', { timeout: 100 });

  // Step 3: Process the data through the filtering algorithm
  await expect(page.locator('[data-testid="filter-status"]')).toHaveText('complete', { timeout: 200 });

  // Step 4: Compare the filtered data to the 80 km threshold
  await expect(page.locator('[data-testid="filtered-value"]')).toHaveText('-999');
  await expect(page.locator('[data-testid="low-fuel-warning"]')).not.toBeVisible();

  // Step 5: Verify that the low fuel warning icon does not appear on the cluster display
  await expect(page.locator('[data-testid="low-fuel-warning"]')).not.toBeVisible();

  // Postconditions: No low fuel warning icon is visible on the cluster display
  await expect(page.locator('[data-testid="low-fuel-warning"]')).not.toBeVisible();
});