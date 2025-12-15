import { test, expect } from '@playwright/test';

test("TC-func-126B1A7C7-16 - Verify no notification email is sent for non-important action such as viewing profile", async ({ page }) => {
  // Intercept any email trigger requests
  let emailTriggered = false;
  await page.route('**/api/send-email', route => {
    emailTriggered = true;
    route.continue();
  });

  // Step 1: User navigates to view profile page
  await page.goto('/profile');
  await page.waitForLoadState('networkidle');

  // Verify page loads successfully with user information
  const userInfo = page.locator('[data-testid="user-info"]');
  await expect(userInfo).toBeVisible();

  // Step 2: System checks action type
  // Wait briefly to allow any potential email trigger to occur
  await page.waitForTimeout(2000);

  // Verify that no email trigger was executed
  await expect(emailTriggered).toBe(false);
});