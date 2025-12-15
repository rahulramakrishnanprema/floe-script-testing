import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-12 - Verify system behavior when exporting with no data", async ({ page }) => {
  // Preconditions: User is logged in, has permission, data set is empty
  // (Assuming preconditions are already satisfied)

  // Step 1: Navigate to data export page
  await page.goto('/data-export');
  const exportPageHeader = page.locator('[data-testid="export-page-header"]');
  await expect(exportPageHeader).toBeVisible();

  // Step 2: Select CSV format and click export
  const formatSelect = page.locator('[data-testid="format-select"]');
  await formatSelect.click();
  const csvOption = page.locator('[data-testid="format-option-csv"]');
  await csvOption.click();

  const exportButton = page.locator('[data-testid="export-button"]');
  await exportButton.click();

  // Expected: System shows message that no data available or generates empty CSV with headers
  const noDataMessage = page.locator('[data-testid="no-data-message"]');
  await expect(noDataMessage).toBeVisible();
  await expect(noDataMessage).toHaveText('No data available');

  const download = await page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
  if (download) {
    await expect(download.suggestedFilename()).toMatch(/\.csv$/);
    const path = await download.path();
    const content = await page.evaluate((p) => {
      const fs = require('fs');
      return fs.readFileSync(p, 'utf8');
    }, path);
    // Expect file to contain only headers (e.g., at least one line)
    const lines = content.split('\n').filter(line => line.trim() !== '');
    await expect(lines.length).toBeGreaterThan(0);
  }
});