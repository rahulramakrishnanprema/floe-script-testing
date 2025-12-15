import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-15 - Verify system handles export when no data is present", async ({ page }) => {
  // Navigate to data view page
  await page.goto('TODO');

  // Verify data view page loads successfully
  const pageHeader = page.locator('[data-testid="TODO"]');
  await expect(pageHeader).toBeVisible();

  // Click the export CSV button
  const exportButton = page.locator('[data-testid="TODO"]');
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 5000 }).catch(() => null),
    exportButton.click()
  ]);

  // Verify system generates CSV with header only or displays no data message
  if (download) {
    const downloadPath = await download.path();
    expect(downloadPath).toBeDefined();
    // Optional: verify file contains only header row (requires reading file)
    // const content = await download.text();
    // expect(content.trim()).toBe('header1,header2,header3'); // adjust as needed
  } else {
    const noDataMessage = page.locator('[data-testid="TODO"]');
    await expect(noDataMessage).toBeVisible();
  }
});