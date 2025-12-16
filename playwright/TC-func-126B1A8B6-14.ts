import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test("TC-func-126B1A8B6-14 - Verify that the system allows a user to export data as CSV file with correct headers and data rows", async ({ page }) => {
  // Precondition: User is logged in and on data export page
  await page.goto('/data-export');

  // Step 1: Click Export CSV button and wait for download
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-testid="export-csv-button"]').click()
  ]);

  // Verify that a CSV file was downloaded
  expect(download.suggestedFilename()).toMatch(/\.csv$/);

  // Step 2: Read and validate the CSV file
  const downloadPath = await download.path();
  const fileContent = fs.readFileSync(downloadPath, 'utf8');
  const lines = fileContent.split('\n').filter(l => l.trim() !== '');
  expect(lines.length).toBeGreaterThan(1);

  const headerColumns = lines[0].split(',');
  lines.slice(1).forEach(row => {
    const columns = row.split(',');
    expect(columns.length).toBe(headerColumns.length);
  });

  // Postcondition: No error messages displayed
  const errorCount = await page.locator('[data-testid="error-message"]').count();
  expect(errorCount).toBe(0);
});