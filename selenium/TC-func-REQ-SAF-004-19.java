import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-SAF-004-19_Test {
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
    public void test_TC-func-REQ-SAF-004-19() throws InterruptedException {
        // Step 1: Keep sensor voltage constant at 2.5V for 29 seconds
        WebElement voltageInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='sensor-voltage-input']")));
        voltageInput.clear();
        voltageInput.sendKeys("2.5");
        WebElement setButton = driver.findElement(By.cssSelector("[data-testid='set-voltage-button']"));
        setButton.click();
        Thread.sleep(29000);

        // Step 2: Verify no fault code present
        boolean faultAbsent = wait.until(driver1 -> {
            try {
                driver1.findElement(By.cssSelector("[data-testid='fault-code']"));
                return false;
            } catch (NoSuchElementException e) {
                return true;
            }
        });
        Assert.assertTrue(faultAbsent, "Fault code should be absent after 29 seconds");

        // Step 3: Continue keeping sensor unchanged for 2 more seconds to reach 31 seconds
        Thread.sleep(2000);

        // Step 4: Verify system activates fault detection
        WebElement faultCodeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='fault-code']")));
        Assert.assertTrue(faultCodeElement.isDisplayed(), "Fault code should be displayed after >30s");

        // Step 5: Verify low-fuel warning displayed
        WebElement warningElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='low-fuel-warning']")));
        Assert.assertTrue(warningElement.isDisplayed(), "Low-fuel warning should be active");

        // Step 6: Verify diagnostic message displayed
        WebElement diagMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='diagnostic-message']")));
        Assert.assertTrue(diagMessage.isDisplayed(), "Diagnostic message should appear");

        // Step 7: Verify fault log entry recorded
        WebElement logEntry = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='fault-log-entry']")));
        Assert.assertTrue(logEntry.isDisplayed(), "Fault log entry should be present");

        // Step 8: Set sensor voltage back to 2.5V within 5 seconds and provide 3 consecutive valid readings
        for (int i = 0; i < 3; i++) {
            voltageInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='sensor-voltage-input']")));
            voltageInput.clear();
            voltageInput.sendKeys("2.5");
            setButton = driver.findElement(By.cssSelector("[data-testid='set-voltage-button']"));
            setButton.click();
            Thread.sleep(1000);
        }

        // Step 9: Verify fault code cleared
        boolean faultCleared = wait.until(driver1 -> {
            try {
                driver1.findElement(By.cssSelector("[data-testid='fault-code']"));
                return false;
            } catch (NoSuchElementException e) {
                return true;
            }
        });
        Assert.assertTrue(faultCleared, "Fault code should be cleared after valid readings");

        // Step 10: Verify low-fuel warning inactive
        boolean warningInactive = wait.until(driver1 -> {
            try {
                WebElement w = driver1.findElement(By.cssSelector("[data-testid='low-fuel-warning']"));
                return !w.isDisplayed();
            } catch (NoSuchElementException e) {
                return true;
            }
        });
        Assert.assertTrue(warningInactive, "Low-fuel warning should be inactive");

        // Step 11: Verify diagnostic message cleared
        boolean diagCleared = wait.until(driver1 -> {
            try {
                driver1.findElement(By.cssSelector("[data-testid='diagnostic-message']"));
                return false;
            } catch (NoSuchElementException e) {
                return true;
            }
        });
        Assert.assertTrue(diagCleared, "Diagnostic message should be cleared");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}