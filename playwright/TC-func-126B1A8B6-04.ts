import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-04 - System stores password securely in hashed form", async ({ page }) => {
  await page.goto('https://example.com/register');

  const email = 'user@example.com';
  const password = 'StrongPass!123';

  await page.fill('[data-testid="email"]', email);
  await expect(page.locator('[data-testid="email"]')).toHaveValue(email);

  await page.fill('[data-testid="password"]', password);
  await expect(page.locator('[data-testid="password"]')).toHaveValue(password);

  await page.click('[data-testid="create-account"]');
  await expect(page.locator('[data-testid="success-message"]')).toContainText('Account created');

  const storedPassword = await page.locator('[data-testid="stored-password"]').textContent();
  await expect(storedPassword).not.toMatch(/[a-zA-Z0-9]+/);
  await expect(storedPassword).toMatch(/^[a-f0-9]{64}$/);
});