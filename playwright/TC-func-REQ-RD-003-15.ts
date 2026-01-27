import { test, expect } from '@playwright/test';

test("TC-func-REQ-RD-003-15 - Restore system warning state to active", async ({ page }) => {
  // Step 1: Send POST request to /system/restore
  const response = await page.request.post('/system/restore');
  const json = await response.json();
  expect(json.restored).toBe(true);
  expect(json.warningActive).toBe(true);

  // Step 2: Verify system warningActive true
  const warningStatus = await page.locator('[data-testid="TODO"]').textContent();
  expect(warningStatus).toBe('true');
});