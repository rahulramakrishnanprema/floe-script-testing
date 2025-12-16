import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-08 - Ensure system defends against malformed token injection during login", async ({ page }) => {
  // Step 1: Send login request with the malformed token to the authentication endpoint
  const malformedToken = "malicious_payload";
  const response = await page.request.post('https://example.com/api/login', {
    data: { token: malformedToken }
  });
  await expect(response.ok()).toBe(false);
  const errorBody = await response.json();
  await expect(errorBody.message).toContain('invalid token');

  // Step 2: Inspect system logs for any security alerts
  await page.goto('https://example.com/admin/logs');
  const logEntries = page.locator('[data-testid="log-entry"]');
  await expect(logEntries).toContainText('Unauthorized access attempt');
  await expect(logEntries).toHaveCount(1);

  // Postconditions: Login attempt is recorded as failed, No session is created for the malicious token
  const sessionCookie = (await page.context().cookies()).find(c => c.name === 'session');
  await expect(sessionCookie).toBeUndefined();
});