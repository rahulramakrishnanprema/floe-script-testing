import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-02 - User creates an account with email at maximum allowed length", async ({ page }) => {
  // Step 1: Enter an email address of 254 characters
  const email = "a".repeat(242) + "@example.com";
  await page.locator('[data-testid="email-input"]').fill(email);
  await expect(page.locator('[data-testid="email-input"]')).toHaveValue(email);

  // Step 2: Enter a valid password
  const password = "ValidPassword123!";
  await page.locator('[data-testid="password-input"]').fill(password);
  await expect(page.locator('[data-testid="password-input"]')).toHaveValue(password);

  // Step 3: Click Create Account
  await page.locator('[data-testid="create-account-button"]').click();
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();

  // Step 4: Verify email stored as 254 characters
  const successMessage = await page.locator('[data-testid="success-message"]').textContent();
  await expect(successMessage).toContain(email);
  await expect(email.length).toBe(254);
});