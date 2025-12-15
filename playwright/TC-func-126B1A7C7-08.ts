import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-08 - Tampered token login verifies system rejects altered token and logs security incident", async ({ page }) => {
  // Precondition: User is not logged in
  await page.goto('https://example.com/login');

  // Step 1: User submits login request with tampered token
  await page.locator('[data-testid="token-input"]').fill('tamperedToken');
  await page.locator('[data-testid="login-button"]').click();

  // Step 2: System validates token signature and fails
  const errorMessage = page.locator('[data-testid="error-message"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Invalid token');

  // Postcondition: User remains logged out
  const userProfile = page.locator('[data-testid="user-profile"]');
  await expect(userProfile).not.toBeVisible();

  // Postcondition: No session created
  const authToken = await page.evaluate(() => localStorage.getItem('authToken'));
  expect(authToken).toBeNull();

  // Postcondition: Security incident logged
  const incidentLog = page.locator('[data-testid="incident-log"]');
  await expect(incidentLog).toBeVisible();
  await expect(incidentLog).toHaveText(/tampered token/i);
});