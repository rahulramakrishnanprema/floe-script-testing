import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-11 - Verify dashboard displays appropriate message when no statistics are available", async ({ page }) => {
  // Step 1: Navigate to dashboard
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/dashboard$/);

  // Step 2: Verify statistics section shows message No statistics available
  const statsMessage = page.locator('[data-testid="statistics-message"]');
  await expect(statsMessage).toHaveText('No statistics available');
});