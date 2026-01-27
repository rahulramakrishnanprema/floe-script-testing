import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-003-14 - Verify warning state persistence across firmware reset without auto clearing", async ({ page }) => {
  // Precondition: Low fuel warning active at 110 km, Firmware reset capability enabled
  await page.goto('app://dashboard');

  const lowFuelWarning = page.locator('[data-testid="low-fuel-warning"]');
  await expect(lowFuelWarning).toBeVisible();

  // Step 1: Trigger firmware reset
  const firmwareResetButton = page.locator('[data-testid="firmware-reset-button"]');
  await firmwareResetButton.click();

  await page.waitForLoadState('networkidle');

  // Expected: Low fuel warning remains active after reboot
  await expect(lowFuelWarning).toBeVisible();

  // Step 2: Increase fuel level to 121 km
  const fuelLevelInput = page.locator('[data-testid="fuel-level-input"]');
  await fuelLevelInput.fill('121');

  const updateButton = page.locator('[data-testid="fuel-level-update-button"]');
  await updateButton.click();

  // Expected: Low fuel warning clears
  await expect(lowFuelWarning).toHaveCount(0);
});