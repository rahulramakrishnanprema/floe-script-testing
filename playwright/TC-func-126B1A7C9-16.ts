import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-16 - Ensure unauthorized users cannot export data", async ({ page }) => {
  // Step 1: Attempt to access export endpoint via URL
  const exportUrl = 'https://example.com/export';
  const response = await page.goto(exportUrl);
  await expect(response).not.toBeNull();
  await expect(response?.status()).toBe(403);

  // Step 2: Attempt to click export button if visible
  const exportButton = page.locator('[data-testid="export-button"]');
  const isVisible = await exportButton.isVisible();
  if (isVisible) {
    const isDisabled = await exportButton.isDisabled();
    await expect(isDisabled).toBeTruthy();

    if (!isDisabled) {
      await exportButton.click();
    }
  }

  // Verify access denied message is shown
  const accessDeniedMessage = page.locator('[data-testid="access-denied-message"]');
  await expect(accessDeniedMessage).toBeVisible();

  // Verify no CSV file is downloaded
  let downloadOccurred = false;
  try {
    await page.waitForEvent('download', { timeout: 3000 });
    downloadOccurred = true;
  } catch {
    // Timeout indicates no download occurred
  }
  await expect(downloadOccurred).toBe(false);
});