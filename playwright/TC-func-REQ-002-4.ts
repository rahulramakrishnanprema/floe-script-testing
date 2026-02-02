import { test, expect } from '@playwright/test';

test("TC-func-REQ-002-4 - Validate that the low fuel indicator uses the approved red color according to regulatory standards", async ({ page }) => {
  // Precondition: Vehicle dashboard is powered on and indicator is visible
  await page.waitForSelector('[data-testid="low-fuel-indicator"]');

  // Step 1: Observe the color of the low fuel indicator
  const indicatorColor = await page.locator('[data-testid="low-fuel-indicator"]').evaluate((el) => {
    return getComputedStyle(el).color;
  });
  expect(indicatorColor).toBe('rgb(255, 0, 0)');

  // Step 2: Compare the displayed color with the regulatory color specification
  const [r1, g1, b1] = indicatorColor.match(/\d+/g).map(Number);
  const [r2, g2, b2] = [255, 0, 0]; // Regulatory specification
  const tolerance = 5;
  const colorMatches = Math.abs(r1 - r2) <= tolerance &&
                       Math.abs(g1 - g2) <= tolerance &&
                       Math.abs(b1 - b2) <= tolerance;
  expect(colorMatches).toBeTruthy();
});