import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-04 - Verify system prevents duplicate email registration", async ({ page }) => {
  // Step 1: Open the registration page
  await page.goto('/register');
  await expect(page.locator('[data-testid="register-page"]')).toBeVisible();

  // Step 2: Enter email 'user@example.com' and password 'StrongPass123'
  await page.locator('[data-testid="email-input"]').fill('user@example.com');
  await page.locator('[data-testid="password-input"]').fill('StrongPass123');
  await expect(page.locator('[data-testid="email-input"]')).toHaveValue('user@example.com');
  await expect(page.locator('[data-testid="password-input"]')).toHaveValue('StrongPass123');

  // Step 3: Click the register button
  await page.locator('[data-testid="register-button"]').click();
  await expect(page.locator('[data-testid="error-message"]')).toHaveText('Email already registered');
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
});