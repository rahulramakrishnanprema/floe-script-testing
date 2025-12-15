import { test, expect } from '@playwright/test';

test('TC-func-126B1A7C7-15 - Verify notification email is sent when a new user registers', async ({ page }) => {
  // Step 1: The user submits the registration form with required details
  await page.goto('/register');
  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', 'Password123!');
  await page.fill('[data-testid="confirm-password"]', 'Password123!');
  await page.click('[data-testid="register-button"]');

  // Expected: The system creates a new user account and triggers the registration event
  const successMessage = page.locator('[data-testid="success-message"]');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText(/registration successful/i);

  // Step 2: The system sends a notification email to the user email address
  await page.goto('/email/inbox');
  const emailItem = page.locator('[data-testid="email-item"][data-subject*="Welcome"]');
  await expect(emailItem).toBeVisible();
  await expect(emailItem).toContainText('Welcome to our service');
});