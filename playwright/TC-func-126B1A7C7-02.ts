import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-02 - Verify error handling for invalid email format during account creation", async ({ page }) => {
  await page.goto('https://example.com/register');
  const registerPage = page.locator('[data-testid="register-page"]');
  await expect(registerPage).toBeVisible();

  await page.fill('[data-testid="email-input"]', 'invalidemail');
  await page.fill('[data-testid="password-input"]', 'StrongPass123');
  await expect(page.inputValue('[data-testid="email-input"]')).toBe('invalidemail');
  await expect(page.inputValue('[data-testid="password-input"]')).toBe('StrongPass123');

  await page.click('[data-testid="register-button"]');
  const errorMessage = page.locator('[data-testid="error-message"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Invalid email format');
});