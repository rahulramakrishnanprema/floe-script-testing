import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class TC-func-REQ-SAF-004-22_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Navigate to the vehicle diagnostics page
        driver.get("http://vehicle-diagnostics.example.com");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-004-22() {
        // Step 1: Set sensor voltage to 0.3V to trigger short circuit fault
        WebElement voltageInput = wait.until(ExpectedConditions.elementToBeClickable(By.id("sensorVoltageInput")));
        voltageInput.clear();
        voltageInput.sendKeys("0.3");
        WebElement setButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("setVoltageButton")));
        setButton.click();

        // Step 2: Verify fault code stored and warning active
        WebElement faultCodeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("faultCodeDisplay")));
        Assert.assertTrue(faultCodeElement.getText().contains("SHORT_CIRCUIT"), "Fault code not activated");

        WebElement warningElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("warningDisplay")));
        Assert.assertTrue(warningElement.getText().contains("Low Fuel"), "Low-fuel warning not active");

        // Step 3: Set sensor voltage back to 4.0V within 3 seconds and provide only 2 consecutive valid readings
        voltageInput = wait.until(ExpectedConditions.elementToBeClickable(By.id("sensorVoltageInput")));
        voltageInput.clear();
        voltageInput.sendKeys("4.0");
        setButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("setVoltageButton")));
        setButton.click();

        // Simulate two consecutive valid readings
        WebElement readButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("readSensorButton")));
        readButton.click();
        try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        readButton.click();

        // Step 4: Verify fault code remains active
        faultCodeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("faultCodeDisplay")));
        Assert.assertTrue(faultCodeElement.getText().contains("SHORT_CIRCUIT"), "Fault code cleared unexpectedly");

        // Step 5: Verify low-fuel warning still active
        warningElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("warningDisplay")));
        Assert.assertTrue(warningElement.getText().contains("Low Fuel"), "Low-fuel warning cleared unexpectedly");

        // Step 6: Verify diagnostic message still displayed
        WebElement diagnosticMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("diagnosticMessageDisplay")));
        Assert.assertTrue(diagnosticMessage.isDisplayed(), "Diagnostic message not displayed");
    }
}