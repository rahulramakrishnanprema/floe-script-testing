import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-003-13 - Verify warning state persistence across vehicle shutdown and reactivation upon next ignition", async ({ page }) => {
  // Step 1: Initiate vehicle shutdown
  await page.locator('[data-testid="vehicle-shutdown"]').click();
  const eventHistory = page.locator('[data-testid="event-history"]');
  await expect(eventHistory).toContainText('Low fuel warning persisted');

  // Step 2: Power off vehicle
  await page.locator('[data-testid="power-off"]').click();
  const powerStatus = page.locator('[data-testid="power-status"]');
  await expect(powerStatus).toHaveText('Off');

  // Step 3: Power on vehicle
  await page.locator('[data-testid="power-on"]').click();
  const warningIndicator = page.locator('[data-testid="warning-indicator"]');
  await expect(warningIndicator).toHaveText('Low fuel warning');

  // Step 4: Increase fuel level to 121 km
  await page.locator('[data-testid="fuel-level-input"]').fill('121');
  await page.locator('[data-testid="fuel-level-submit"]').click();
  await expect(warningIndicator).not.toHaveText('Low fuel warning');
});