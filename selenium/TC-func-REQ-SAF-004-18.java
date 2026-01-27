import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
import java.util.List;

public class TC-func-REQ-SAF-004-18_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        driver.get("http://vehicle-system-ui-url");
    }

    @Test
    public void test_TC-func-REQ-SAF-004-18() {
        // Step 1: Keep sensor voltage constant at 2.5V for 31 seconds
        By sensorVoltageInput = By.cssSelector("[data-testid='sensor-voltage-input']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(sensorVoltageInput));
        WebElement voltageInput = driver.findElement(sensorVoltageInput);
        voltageInput.clear();
        voltageInput.sendKeys("2.5");
        try { Thread.sleep(31000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        // Step 2: Verify system activates fault detection after 30s
        By faultCodeElement = By.cssSelector("[data-testid='fault-code']");
        wait.until(ExpectedConditions.textToBePresentInElementLocated(faultCodeElement, "FUEL_SENSOR_FAILURE"));
        String faultCode = driver.findElement(faultCodeElement).getText();
        Assert.assertEquals(faultCode, "FUEL_SENSOR_FAILURE", "Fault code should be FUEL_SENSOR_FAILURE");

        // Step 3: Verify continuous low-fuel warning displayed
        By lowFuelWarning = By.cssSelector("[data-testid='low-fuel-warning']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(lowFuelWarning));
        Assert.assertTrue(driver.findElement(lowFuelWarning).isDisplayed(), "Low-fuel warning should be active");

        // Step 4: Verify diagnostic message displayed
        By diagnosticMessage = By.cssSelector("[data-testid='diagnostic-message']");
        wait.until(ExpectedConditions.textToBePresentInElementLocated(diagnosticMessage, "FUEL SENSOR ERROR - SERVICE REQUIRED"));
        String diagMsg = driver.findElement(diagnosticMessage).getText();
        Assert.assertEquals(diagMsg, "FUEL SENSOR ERROR - SERVICE REQUIRED", "Diagnostic message should appear");

        // Step 5: Verify fault log entry recorded
        By faultLogEntry = By.cssSelector("[data-testid='fault-log-entry']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(faultLogEntry));
        Assert.assertTrue(driver.findElement(faultLogEntry).isDisplayed(), "Fault log entry should be present");

        // Step 6: Set sensor voltage back to 2.5V within 5 seconds and provide 3 consecutive valid readings
        By resetSensorButton = By.cssSelector("[data-testid='reset-sensor-button']");
        wait.until(ExpectedConditions.elementToBeClickable(resetSensorButton));
        driver.findElement(resetSensorButton).click();
        for (int i = 0; i < 3; i++) {
            wait.until(ExpectedConditions.visibilityOfElementLocated(sensorVoltageInput));
            voltageInput = driver.findElement(sensorVoltageInput);
            voltageInput.clear();
            voltageInput.sendKeys("2.5");
            try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        }

        // Step 7: Verify fault code cleared
        wait.until(ExpectedConditions.invisibilityOfElementLocated(faultCodeElement));
        List<WebElement> faultCodeElements = driver.findElements(faultCodeElement);
        Assert.assertTrue(faultCodeElements.isEmpty(), "Fault code should be cleared");

        // Step 8: Verify low-fuel warning inactive
        wait.until(ExpectedConditions.invisibilityOfElementLocated(lowFuelWarning));
        List<WebElement> lowFuelWarnings = driver.findElements(lowFuelWarning);
        Assert.assertTrue(lowFuelWarnings.isEmpty(), "Low-fuel warning should stop");

        // Step 9: Verify diagnostic message cleared
        wait.until(ExpectedConditions.invisibilityOfElementLocated(diagnosticMessage));
        List<WebElement> diagnosticMessages = driver.findElements(diagnosticMessage);
        Assert.assertTrue(diagnosticMessages.isEmpty(), "Diagnostic message should disappear");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}