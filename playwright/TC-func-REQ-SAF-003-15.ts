import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-003-15 - Verify warning state persistence during transient communication glitch", async ({ page }) => {
  // Navigate to vehicle dashboard
  await page.goto('/vehicle-dashboard');

  // Step 1: Induce communication glitch
  await page.locator('[data-testid="simulate-comm-glitch"]').click();
  await page.waitForTimeout(5000); // simulate 5-second glitch
  const warning = page.locator('[data-testid="low-fuel-warning"]');
  await expect(warning).toBeVisible();

  // Step 2: Restore communication
  await page.locator('[data-testid="restore-comm"]').click();
  await expect(warning).toBeVisible();

  // Step 3: Increase fuel level to 121 km
  await page.locator('[data-testid="fuel-level-input"]').fill('121');
  await page.locator('[data-testid="update-fuel"]').click();
  await expect(warning).not.toBeVisible();
});