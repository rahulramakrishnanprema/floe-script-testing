import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test("TC-func-126B1A8B6-15 - Export data containing special characters such as commas, quotes and newlines", async ({ page }) => {
  // Navigate to data export page
  await page.goto('https://example.com/data-export'); // replace with actual URL

  // Click on Export CSV button
  await page.click('[data-testid="export-csv"]');

  // Wait for the download to start
  const download = await page.waitForEvent('download', { timeout: 60000 });

  // Verify the downloaded file has a .csv extension
  const fileName = download.suggestedFilename();
  expect(fileName).toMatch(/\.csv$/);

  // Save the downloaded file to a temporary location
  const tempPath = path.join(process.cwd(), fileName);
  await download.saveAs(tempPath);

  // Read the content of the CSV file
  const fileContent = fs.readFileSync(tempPath, 'utf8');

  // Verify that fields containing commas are quoted
  expect(fileContent).toMatch(/"[^"]*,[^"]*"/);

  // Verify that internal quotation marks are doubled
  expect(fileContent).toMatch(/""/);

  // Verify that newline characters inside fields are represented within quotes
  expect(fileContent).toMatch(/"[^"]*\n[^"]*"/);
});