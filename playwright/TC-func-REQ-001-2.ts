import { test, expect } from '@playwright/test';

test("TC-func-REQ-001-2 - Verify that the low fuel audible warning is triggered and conforms to FMVSS 101 and ECE R121 specifications", async ({ page }) => {
  await page.goto('http://localhost');

  // Step 1: Reduce fuel level to below the low fuel threshold
  await page.locator('[data-testid="fuel-level-decrease"]').click();
  const lowFuelIndicator = page.locator('[data-testid="low-fuel-indicator"]');
  await expect(lowFuelIndicator).toBeVisible();

  // Step 2: Listen for audible warning
  const audibleWarning = page.locator('[data-testid="audible-warning"]');
  await expect(audibleWarning).toBeVisible({ timeout: 2000 });

  // Step 3: Measure tone duration
  const toneDurationLocator = page.locator('[data-testid="tone-duration"]');
  const durationText = await toneDurationLocator.textContent();
  const durationMs = parseInt(durationText || '0', 10);
  expect(durationMs).toBeLessThanOrEqual(1000);

  // Step 4: Check tone frequency
  const toneFrequencyLocator = page.locator('[data-testid="tone-frequency"]');
  const frequencyText = await toneFrequencyLocator.textContent();
  expect(frequencyText).toBe('approved value');

  // Step 5: Increase fuel level above threshold
  await page.locator('[data-testid="fuel-level-increase"]').click();
  await expect(audibleWarning).not.toBeVisible({ timeout: 1000 });
});