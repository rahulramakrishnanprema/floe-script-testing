import { test, expect } from '@playwright/test';

test('TC-func-126B1A8B6-13 - Verify dashboard data is correctly retrieved from the analytics service', async ({ page }) => {
  // Step 1: Navigate to the dashboard page
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  expect(page).toHaveURL(/dashboard/);

  // Wait for the analytics service request to complete
  const analyticsResponse = await page.waitForResponse((response) => {
    return response.url().includes('/api/analytics') && response.request().method() === 'GET';
  });
  expect(analyticsResponse.ok()).toBeTruthy();

  const analyticsData = await analyticsResponse.json();

  // Step 2: Validate that the displayed statistics match the data returned by the analytics service
  for (const [key, value] of Object.entries(analyticsData)) {
    const statLocator = page.locator(`[data-testid="stat-${key}"]`);
    const textContent = await statLocator.textContent();
    expect(textContent?.trim()).toBe(String(value));
  }
});