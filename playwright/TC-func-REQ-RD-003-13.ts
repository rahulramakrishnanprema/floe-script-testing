import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-003-13 - Deactivate warning when estimated range exceeds deactivation threshold", async ({ page }) => {
  // Precondition: warningActive true, currentRangeKm 110, deactivationThresholdKm 120
  // Assume preconditions are already set in system.

  // Step 1: Send POST request to /warning/evaluate with body {estimatedRangeKm: 125}
  const response = await page.request.post('/warning/evaluate', {
    data: { estimatedRangeKm: 125 }
  });
  const json = await response.json();
  expect(json.warningState).toBe('INACTIVE');
  expect(json.reason).toBe('RANGE_ABOVE_DEACTIVATION_THRESHOLD');

  // Step 2: Verify system warningActive false
  const warningStatusLocator = page.locator('[data-testid="TODO"]');
  const warningStatusText = await warningStatusLocator.textContent();
  expect(warningStatusText?.trim()).toBe('false');

  // Postcondition: warningActive false
});