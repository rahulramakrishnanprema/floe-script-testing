import { test, expect } from '@playwright/test';

test('TC-func-126B1A8B6-05 - System prevents creation of duplicate email accounts', async ({ page }) => {
  const existingEmail = 'existing@example.com';
  const password = 'ComplexPass123!';

  await page.goto('/register');

  await page.fill('[data-testid="email-input"]', existingEmail);
  await expect(page.locator('[data-testid="email-input"]')).toHaveValue(existingEmail);

  await page.fill('[data-testid="password-input"]', password);
  await expect(page.locator('[data-testid="password-input"]')).toHaveValue(password);

  await page.click('[data-testid="create-account-btn"]');
  await expect(page.locator('[data-testid="email-error"]')).toHaveText(/email already exists/i);

  await expect(page).toHaveURL(/register/);
  await expect(page.locator('[data-testid="success-message"]')).toHaveCount(0);
});