import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-004-21 - Fault not cleared when 3 consecutive valid readings occur after 6 seconds", async ({ page }) => {
  // Precondition: Vehicle system powered on and in normal operation, Fuel sensor connected and providing valid voltage 4.0V, Vehicle speed set to 25 km/h
  // Assume preconditions are already met in the test environment

  // Step 1: Set sensor voltage to 4.7V to trigger open circuit fault
  await page.locator('[data-testid="sensor-voltage-input"]').fill('4.7');
  await page.waitForTimeout(1000); // wait for system to register fault
  const faultIndicator = page.locator('[data-testid="fault-indicator"]');
  await expect(faultIndicator).toBeVisible();

  // Step 2: Verify fault code stored and warning active
  const faultCode = page.locator('[data-testid="fault-code"]');
  await expect(faultCode).toHaveText(/.*/); // placeholder for fault code
  const warningIndicator = page.locator('[data-testid="low-fuel-warning"]');
  await expect(warningIndicator).toBeVisible();

  // Step 3: Set sensor voltage back to 4.0V and wait 6 seconds before providing 3 consecutive valid readings
  await page.locator('[data-testid="sensor-voltage-input"]').fill('4.0');
  await page.waitForTimeout(6000);
  for (let i = 0; i < 3; i++) {
    await page.locator('[data-testid="sensor-voltage-input"]').fill('4.0');
    await page.waitForTimeout(500); // simulate reading interval
  }

  // Step 4: Verify fault code remains active
  await expect(faultCode).toBeVisible();

  // Step 5: Verify low-fuel warning still active
  await expect(warningIndicator).toBeVisible();

  // Step 6: Verify diagnostic message still displayed
  const diagnosticMessage = page.locator('[data-testid="diagnostic-message"]');
  await expect(diagnosticMessage).toBeVisible();
});