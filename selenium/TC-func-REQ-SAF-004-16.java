import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-REQ-SAF-004-16_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, 10);
        driver.get("http://vehicle-system-url");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-004-16() {
        // Step 1: Set sensor voltage to 4.7V to simulate open circuit fault
        WebElement voltageInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        voltageInput.clear();
        voltageInput.sendKeys("4.7");
        // Assume there is a button to apply voltage
        WebElement applyButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        applyButton.click();
        // Verify system detects voltage above 4.6V and activates fault detection
        WebElement faultDetectionIndicator = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertTrue(faultDetectionIndicator.isDisplayed(), "Fault detection indicator should be visible");

        // Step 2: Verify fault code FUEL_SENSOR_FAILURE is stored in diagnostic memory
        WebElement diagnosticMemory = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        String diagnosticText = diagnosticMemory.getText();
        Assert.assertTrue(diagnosticText.contains("FUEL_SENSOR_FAILURE"), "Diagnostic memory should contain FUEL_SENSOR_FAILURE");

        // Step 3: Verify continuous low-fuel warning is displayed on the cluster
        WebElement lowFuelWarning = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertTrue(lowFuelWarning.isDisplayed(), "Low-fuel warning should be active");

        // Step 4: Verify diagnostic message FUEL SENSOR ERROR - SERVICE REQUIRED is displayed
        WebElement diagnosticMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertTrue(diagnosticMessage.getText().contains("FUEL SENSOR ERROR - SERVICE REQUIRED"), "Diagnostic message should be displayed");

        // Step 5: Verify fault log entry contains timestamp, fault code, and vehicle state
        WebElement faultLog = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        String logText = faultLog.getText();
        Assert.assertTrue(logText.matches(".*\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.*FUEL_SENSOR_FAILURE.*VehicleState.*"), "Log entry should contain timestamp, fault code, and vehicle state");

        // Step 6: Set sensor voltage back to 4.0V within 5 seconds and provide 3 consecutive valid readings
        for (int i = 0; i < 3; i++) {
            WebElement voltageInputReset = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
            voltageInputReset.clear();
            voltageInputReset.sendKeys("4.0");
            WebElement applyButtonReset = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
            applyButtonReset.click();
            // Wait a short period between readings
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        // Verify system validates readings and clears fault
        WebElement faultClearedIndicator = wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));

        // Step 7: Verify fault code is cleared from diagnostic memory
        WebElement diagnosticMemoryAfter = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        String diagnosticTextAfter = diagnosticMemoryAfter.getText();
        Assert.assertFalse(diagnosticTextAfter.contains("FUEL_SENSOR_FAILURE"), "Fault code should be cleared from diagnostic memory");

        // Step 8: Verify low-fuel warning is no longer active
        WebElement lowFuelWarningAfter = wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertTrue(lowFuelWarningAfter == null || !lowFuelWarningAfter.isDisplayed(), "Low-fuel warning should be inactive");

        // Step 9: Verify diagnostic message is cleared from cluster
        WebElement diagnosticMessageAfter = wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertTrue(diagnosticMessageAfter == null || !diagnosticMessageAfter.isDisplayed(), "Diagnostic message should be cleared");
    }
}