import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-13 - Export CSV when no data available", async ({ page }) => {
  // Navigate to export page
  await page.goto('/export');

  // Click Export CSV button
  const exportButton = page.locator('[data-testid="export-csv-button"]');
  await exportButton.click();

  // Verify "No data to export" message
  const noDataMessage = page.locator('[data-testid="no-data-message"]');
  await expect(noDataMessage).toHaveText('No data to export');

  // Verify no file is downloaded
  const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
  const download = await downloadPromise;
  await expect(download).toBeNull();
});