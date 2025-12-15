import { test, expect } from '@playwright/test';
import fs from 'fs/promises';

test("TC-func-126B1A7C7-12 - Export data to CSV with standard data set", async ({ page }) => {
  await page.goto('https://example.com/export');
  await page.waitForLoadState('networkidle');

  const exportButton = page.locator('[data-testid="export-csv-button"]');
  await exportButton.click();

  const [ download ] = await Promise.all([
    page.waitForEvent('download')
  ]);

  const expectedFileName = 'export.csv';
  expect(download.suggestedFilename()).toBe(expectedFileName);

  const downloadPath = await download.path();
  expect(downloadPath).toBeTruthy();

  const fileContent = await fs.readFile(downloadPath!, 'utf8');
  const lines = fileContent.split('\n').filter(l => l.trim() !== '');

  expect(lines.length).toBeGreaterThan(1);

  const header = lines[0];
  const expectedHeader = 'id,name,value';
  expect(header).toBe(expectedHeader);

  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(',');
    expect(columns.length).toBe(3);
  }
});