import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-003-12 - Verify warning activates when fuel level falls below threshold and deactivates only when above hysteresis threshold", async ({ page }) => {
  await page.goto('');
  await page.locator('[data-testid="fuel-level-input"]').fill('125');
  await expect(page.locator('[data-testid="low-fuel-warning"]')).not.toBeVisible();
  await page.locator('[data-testid="fuel-level-input"]').fill('119');
  await expect(page.locator('[data-testid="low-fuel-warning"]')).toBeVisible();
  await page.locator('[data-testid="fuel-level-input"]').fill('121');
  await expect(page.locator('[data-testid="low-fuel-warning"]')).not.toBeVisible();
  await page.locator('[data-testid="fuel-level-input"]').fill('120');
  await expect(page.locator('[data-testid="low-fuel-warning"]')).toBeVisible();
  await page.locator('[data-testid="fuel-level-input"]').fill('121');
  await expect(page.locator('[data-testid="low-fuel-warning"]')).not.toBeVisible();
});