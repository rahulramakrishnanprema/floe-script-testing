import { test, expect } from '@playwright/test';
import fs from 'fs';

test("TC-func-126B1A7C7-11 - Verify that a logged in user can export data as CSV", async ({ page }) => {
  // Step 1: Navigate to the data export page
  await page.goto('/data-export');
  const exportPage = page.locator('[data-testid="export-page"]');
  await expect(exportPage).toBeVisible();

  // Step 2: Select CSV format and click export
  const formatSelect = page.locator('[data-testid="export-format-select"]');
  await expect(formatSelect).toBeVisible();
  await formatSelect.selectOption('csv');
  const exportButton = page.locator('[data-testid="export-button"]');
  await expect(exportButton).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    exportButton.click()
  ]);
  await expect(download.suggestedFilename()).toMatch(/\.csv$/);

  // Step 3: Open downloaded file and verify CSV structure
  const path = await download.path();
  const fileContent = fs.readFileSync(path, 'utf8');
  await expect(fileContent).toContain(',');
  const headers = fileContent.split('\n')[0];
  await expect(headers.split(',').length).toBeGreaterThan(1);
});