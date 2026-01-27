import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
import java.util.List;

public class TC-func-REQ-SAF-004-20_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://vehicle-system-ui-url");
    }

    @Test
    public void test_TC-func-REQ-SAF-004-20() throws InterruptedException {
        // Step 1: Set sensor voltage to 4.7V to trigger open circuit fault
        WebElement voltageInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='sensor-voltage-input']")));
        voltageInput.clear();
        voltageInput.sendKeys("4.7");
        WebElement setButton = driver.findElement(By.cssSelector("[data-testid='set-voltage-button']"));
        setButton.click();
        // Verify fault activated
        WebElement faultIndicator = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='fault-indicator']")));
        Assert.assertTrue(faultIndicator.isDisplayed(), "Fault should be activated");

        // Step 2: Verify fault code stored and warning active
        WebElement faultCode = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='fault-code']")));
        Assert.assertEquals(faultCode.getText(), "OPEN_CIRCUIT", "Fault code should be OPEN_CIRCUIT");
        WebElement warningIndicator = driver.findElement(By.cssSelector("[data-testid='low-fuel-warning']"));
        Assert.assertTrue(warningIndicator.isDisplayed(), "Low-fuel warning should be active");

        // Step 3: Set sensor voltage back to 4.0V within 3 seconds and provide 3 consecutive valid readings
        Thread.sleep(2000); // simulate within 3 seconds
        voltageInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='sensor-voltage-input']")));
        voltageInput.clear();
        voltageInput.sendKeys("4.0");
        setButton = driver.findElement(By.cssSelector("[data-testid='set-voltage-button']"));
        setButton.click();
        // Simulate 3 consecutive readings
        for (int i = 0; i < 3; i++) {
            Thread.sleep(500); // simulate reading interval
        }
        // Verify system validates readings and clears fault
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-testid='fault-indicator']")));

        // Step 4: Verify fault code cleared
        List<WebElement> faultCodes = driver.findElements(By.cssSelector("[data-testid='fault-code']"));
        Assert.assertTrue(faultCodes.isEmpty(), "Fault code should be cleared");

        // Step 5: Verify low-fuel warning inactive
        List<WebElement> warnings = driver.findElements(By.cssSelector("[data-testid='low-fuel-warning']"));
        Assert.assertTrue(warnings.isEmpty(), "Low-fuel warning should be inactive");

        // Step 6: Verify diagnostic message cleared
        List<WebElement> diagMessages = driver.findElements(By.cssSelector("[data-testid='diagnostic-message']"));
        Assert.assertTrue(diagMessages.isEmpty(), "Diagnostic message should be cleared");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}