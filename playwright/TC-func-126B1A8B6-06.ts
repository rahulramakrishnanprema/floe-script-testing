import { test, expect } from '@playwright/test';

test('TC-func-126B1A8B6-06 - Validate successful login using a valid authentication token', async ({ page }) => {
  // Step 1: Send login request with the valid token to the authentication endpoint
  const loginResponse = await page.request.post('https://example.com/api/login', {
    data: { token: 'valid-token' },
  });

  await expect(loginResponse.ok()).toBeTruthy();

  const loginResponseBody = await loginResponse.json();
  const sessionId = loginResponseBody.sessionId;
  await expect(sessionId).toBeDefined();

  // Step 2: Access a protected resource using the session identifier
  await page.context().addCookies([
    {
      name: 'session',
      value: sessionId,
      domain: 'example.com',
      path: '/',
    },
  ]);

  await page.goto('https://example.com/protected', { waitUntil: 'networkidle' });

  const protectedContent = page.locator('[data-testid="protected-content"]');
  await expect(protectedContent).toBeVisible();
});