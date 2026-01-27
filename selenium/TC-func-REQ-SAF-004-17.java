import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-SAF-004-17_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://vehicle-system-url"); // placeholder URL
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-004-17() {
        // Step 1: Set sensor voltage to 0.3V to simulate short circuit fault
        WebElement voltageInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        voltageInput.clear();
        voltageInput.sendKeys("0.3");
        // Wait for system to detect voltage below 0.4V
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.cssSelector("[data-testid='TODO']"), "Voltage below 0.4V"));

        // Step 2: Verify fault code FUEL_SENSOR_FAILURE is stored
        WebElement faultCodeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertTrue(faultCodeElement.getText().contains("FUEL_SENSOR_FAILURE"), "Fault code FUEL_SENSOR_FAILURE not found");

        // Step 3: Verify continuous low-fuel warning is displayed
        WebElement warningElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertTrue(warningElement.getText().contains("Low-fuel warning"), "Low-fuel warning not active");

        // Step 4: Verify diagnostic message FUEL SENSOR ERROR - SERVICE REQUIRED is displayed
        WebElement diagMessageElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertTrue(diagMessageElement.getText().contains("FUEL SENSOR ERROR - SERVICE REQUIRED"), "Diagnostic message not displayed");

        // Step 5: Verify fault log entry contains timestamp, fault code, and vehicle state
        WebElement logEntryElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        String logText = logEntryElement.getText();
        Assert.assertTrue(logText.matches(".*\\d{4}-\\d{2}-\\d{2}.*"), "Timestamp missing in log");
        Assert.assertTrue(logText.contains("FUEL_SENSOR_FAILURE"), "Fault code missing in log");
        Assert.assertTrue(logText.contains("Vehicle state"), "Vehicle state missing in log");

        // Step 6: Set sensor voltage back to 4.0V within 5 seconds and provide 3 consecutive valid readings
        WebElement voltageInput2 = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        voltageInput2.clear();
        voltageInput2.sendKeys("4.0");
        try { Thread.sleep(5000); } catch (InterruptedException e) {}
        for (int i = 0; i < 3; i++) {
            voltageInput2.clear();
            voltageInput2.sendKeys("4.0");
            try { Thread.sleep(1000); } catch (InterruptedException e) {}
        }

        // Step 7: Verify fault code cleared
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        WebElement faultCodeElementAfter = driver.findElement(By.cssSelector("[data-testid='TODO']"));
        Assert.assertFalse(faultCodeElementAfter.getText().contains("FUEL_SENSOR_FAILURE"), "Fault code not cleared");

        // Step 8: Verify low-fuel warning inactive
        WebElement warningElementAfter = driver.findElement(By.cssSelector("[data-testid='TODO']"));
        Assert.assertFalse(warningElementAfter.getText().contains("Low-fuel warning"), "Low-fuel warning still active");

        // Step 9: Verify diagnostic message cleared
        WebElement diagMessageElementAfter = driver.findElement(By.cssSelector("[data-testid='TODO']"));
        Assert.assertFalse(diagMessageElementAfter.isDisplayed(), "Diagnostic message not cleared");
    }
}