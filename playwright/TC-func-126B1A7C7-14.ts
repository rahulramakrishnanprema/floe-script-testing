import { test, expect } from '@playwright/test';
import { promises as fs } from 'fs';

test('TC-func-126B1A7C7-14 - Export CSV with special characters in data', async ({ page }) => {
  // Step 1: Navigate to export page
  await page.goto('/export');
  // Click Export CSV button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-testid="export-csv-button"]').click()
  ]);
  expect(download).toBeDefined();
  // Get downloaded file path
  const path = await download.path();
  expect(path).toBeTruthy();
  // Read file content
  const fileContent = await fs.readFile(path, 'utf8');
  expect(fileContent).toBeTruthy();
  // Step 2: Verify CSV content
  // Check that fields with commas are quoted
  expect(fileContent).toMatch(/"[^"]*,[^"]*"/);
  // Check that fields with newlines are quoted
  expect(fileContent).toMatch(/"[^"]*\n[^"]*"/);
});