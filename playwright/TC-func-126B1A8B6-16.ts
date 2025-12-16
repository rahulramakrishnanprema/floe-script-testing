import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-16 - Attempt to export when no data records are available", async ({ page }) => {
  // Navigate to data export page
  await page.goto('/data-export');

  // Click on Export CSV button
  await page.locator('[data-testid="export-csv-button"]').click();

  // Verify that a message indicating no data to export is displayed
  await expect(page.locator('[data-testid="no-data-message"]')).toBeVisible();

  // Verify that no CSV file is downloaded
  const download = await page.waitForEvent('download', { timeout: 3000 }).catch(() => null);
  await expect(download).toBeNull();
});