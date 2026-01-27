import { test, expect } from '@playwright/test';

test("TC-func-REQ-SAF-004-22 - Fault not cleared when only 2 consecutive valid readings within 5 seconds", async ({ page }) => {
  // Precondition: Vehicle system powered on and in normal operation
  await page.goto('http://localhost:3000/dashboard');

  // Precondition: Fuel sensor connected and providing valid voltage 4.0V
  await page.locator('[data-testid="sensor-voltage-input"]').fill('4.0');
  await page.locator('[data-testid="apply-voltage-button"]').click();

  // Precondition: Vehicle speed set to 25 km/h
  await page.locator('[data-testid="vehicle-speed-input"]').fill('25');
  await page.locator('[data-testid="apply-speed-button"]').click();

  // Step 1: Set sensor voltage to 0.3V to trigger short circuit fault
  await page.locator('[data-testid="sensor-voltage-input"]').fill('0.3');
  await page.locator('[data-testid="apply-voltage-button"]').click();

  // Expected: Fault activated
  const faultCodeLocator = page.locator('[data-testid="fault-code"]');
  await expect(faultCodeLocator).toContainText('Short Circuit Fault');

  // Step 2: Verify fault code stored and warning active
  const warningLocator = page.locator('[data-testid="low-fuel-warning"]');
  await expect(faultCodeLocator).toBeVisible();
  await expect(warningLocator).toBeVisible();

  // Step 3: Set sensor voltage back to 4.0V within 3 seconds and provide only 2 consecutive valid readings
  await page.waitForTimeout(3000);
  await page.locator('[data-testid="sensor-voltage-input"]').fill('4.0');
  await page.locator('[data-testid="apply-voltage-button"]').click();

  // Simulate only 2 consecutive valid readings
  await page.waitForTimeout(1000);
  await page.locator('[data-testid="sensor-voltage-input"]').fill('4.0');
  await page.locator('[data-testid="apply-voltage-button"]').click();

  // Step 4: Verify fault code remains active
  await expect(faultCodeLocator).toBeVisible();

  // Step 5: Verify low-fuel warning still active
  await expect(warningLocator).toBeVisible();

  // Step 6: Verify diagnostic message still displayed
  const diagnosticLocator = page.locator('[data-testid="diagnostic-message"]');
  await expect(diagnosticLocator).toBeVisible();
});