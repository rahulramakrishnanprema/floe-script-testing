import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test("TC-func-126B1A7C9-14 - Verify that a user can export data in CSV format when data is available", async ({ page }) => {
  // Precondition: User is logged in, has export permission, data set populated, export button visible
  // Step 1: Navigate to data view page
  await page.goto('/data-view');
  await expect(page).toHaveURL(/data-view/);

  // Step 2: Click the export CSV button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('export-csv-button').click()
  ]);
  await expect(download).not.toBeNull();

  // Verify that a file download has started
  const downloadPath = await download.path();
  await expect(downloadPath).not.toBeNull();

  // Step 3: Open the downloaded CSV file
  const stats = fs.statSync(downloadPath!);
  await expect(stats.size).toBeGreaterThan(0);

  const content = fs.readFileSync(downloadPath!, 'utf8');
  const lines = content.trim().split('\n');
  await expect(lines.length).toBeGreaterThan(1); // at least header + one data row

  // Basic header check: header line contains a comma
  await expect(lines[0]).toContain(',');
});