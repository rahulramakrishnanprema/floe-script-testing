import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-01 - Successful account creation with valid email and password", async ({ page }) => {
  await page.goto('https://example.com/create-account');
  await page.locator('[data-testid="email-input"]').fill('testuser@example.com');
  await expect(page.locator('[data-testid="email-error"]')).toBeHidden();
  await page.locator('[data-testid="password-input"]').fill('ComplexPass123!');
  await expect(page.locator('[data-testid="password-error"]')).toBeHidden();
  await page.locator('[data-testid="create-account-button"]').click();
  await expect(page).toHaveURL(/welcome/);
  await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();
});