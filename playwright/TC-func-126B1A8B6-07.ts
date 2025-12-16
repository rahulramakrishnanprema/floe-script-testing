import { test, expect } from '@playwright/test';

test("TC-func-126B1A8B6-07 - Verify system rejects login with an expired authentication token", async ({ page }) => {
  // Step 1: Send login request with the expired token to the authentication endpoint
  const loginResponse = await page.request.post('https://example.com/api/auth/login', {
    data: { token: 'expiredToken' }
  });
  expect(loginResponse.status()).toBe(401);
  const loginBody = await loginResponse.json();
  expect(loginBody.error).toBe('Authentication error');

  // Step 2: Attempt to access a protected resource using the same token
  const protectedResponse = await page.request.get('https://example.com/api/protected', {
    headers: { Authorization: 'Bearer expiredToken' }
  });
  expect(protectedResponse.status()).toBe(403);
  const protectedBody = await protectedResponse.json();
  expect(protectedBody.message).toBe('Re-authentication required');
});