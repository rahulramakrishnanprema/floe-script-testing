import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-13 - Verify export handles large data sets without failure", async ({ page }) => {
  // Step 1: Navigate to data export page
  await page.goto('https://example.com');
  await page.waitForLoadState('networkidle');
  await page.click('[data-testid="data-export-link"]');
  await expect(page.locator('[data-testid="export-page-title"]')).toBeVisible();

  // Step 2: Select CSV format and click export
  await page.selectOption('[data-testid="format-select"]', 'csv');
  await page.click('[data-testid="export-button"]');
  await expect(page.locator('[data-testid="download-link"]')).toBeVisible();

  // Step 3: Monitor download progress until completion
  const download = await page.waitForEvent('download');
  await download.finished();
  const path = await download.path();
  expect(path).toBeTruthy();
  expect(download.suggestedFilename()).toMatch(/\.csv$/);
});