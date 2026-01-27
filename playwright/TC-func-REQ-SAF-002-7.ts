import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-002-7 - Validate warning activation latency at the upper temperature limit of the operating range", async ({ page }) => {
  const startTime = Date.now();

  // Step 1: Reduce the fuel level to 79 km
  await page.locator('[data-testid="fuel-level-input"]').fill('79');
  await page.waitForTimeout(100);
  await expect(page.locator('[data-testid="fuel-level-display"]')).toHaveText(/79 km/, { timeout: 100 });

  // Step 2: Allow the system to acquire sensor data
  await expect(page.locator('[data-testid="sensor-acquisition-status"]')).toHaveText(/complete/, { timeout: 100 });

  // Step 3: Process the data through the filtering algorithm
  await expect(page.locator('[data-testid="filtering-status"]')).toHaveText(/complete/, { timeout: 200 });

  // Step 4: Compare the filtered data to the 80 km threshold
  await expect(page.locator('[data-testid="comparison-status"]')).toHaveText(/below threshold/, { timeout: 100 });

  // Step 5: Activate the low fuel warning icon on the cluster display
  await expect(page.locator('[data-testid="low-fuel-warning-icon"]')).toBeVisible({ timeout: 1600 });

  const endTime = Date.now();
  const latency = endTime - startTime;
  await expect(latency).toBeLessThanOrEqual(2000);

  // Postcondition checks
  await expect(page.locator('[data-testid="latency-log"]')).toHaveText(/2\.0 seconds or less/, { timeout: 2000 });
  await expect(page.locator('[data-testid="system-mode"]')).toHaveText(/normal/, { timeout: 2000 });
});