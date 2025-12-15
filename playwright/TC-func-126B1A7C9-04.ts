import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C9-04 - Password is stored hashed in database", async ({ page }) => {
  // Step 1: Register account with valid email and password
  await page.goto('https://example.com/register');
  await page.fill('[data-testid="email-input"]', 'user3@example.com');
  await page.fill('[data-testid="password-input"]', 'SecurePass123');
  await page.click('[data-testid="register-submit"]');
  await expect(page.locator('[data-testid="toast-success"]')).toHaveText('Account created');

  // Step 2: Access database record for user3@example.com
  // Assuming a debug page or API endpoint that exposes the hashed password
  const hashedPasswordLocator = page.locator('[data-testid="hashed-password"]');
  await expect(hashedPasswordLocator).not.toHaveText('SecurePass123');
  await expect(hashedPasswordLocator).toMatch(/^[a-f0-9]{64}$/);
});