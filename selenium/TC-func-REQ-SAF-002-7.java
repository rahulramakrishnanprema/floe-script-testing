import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-SAF-002-7_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://example.com"); // placeholder URL
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-002-7() {
        // Step 1: Reduce the fuel level to 79 km
        WebElement fuelInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='fuel-level-input']")));
        fuelInput.clear();
        fuelInput.sendKeys("79");
        fuelInput.sendKeys(Keys.RETURN);

        // Verify sensor reports 79 km within 100 ms
        long sensorStart = System.currentTimeMillis();
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.cssSelector("[data-testid='fuel-level-display']"), "79"));
        long sensorLatency = System.currentTimeMillis() - sensorStart;
        Assert.assertTrue(sensorLatency <= 100, "Sensor latency exceeded 100 ms: " + sensorLatency + " ms");

        // Step 2: Allow the system to acquire sensor data within 100 ms
        long acquisitionStart = System.currentTimeMillis();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-testid='acquisition-spinner']")));
        long acquisitionLatency = System.currentTimeMillis() - acquisitionStart;
        Assert.assertTrue(acquisitionLatency <= 100, "Acquisition latency exceeded 100 ms: " + acquisitionLatency + " ms");

        // Step 3: Process the data through the filtering algorithm within 200 ms
        long filteringStart = System.currentTimeMillis();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-testid='filtering-spinner']")));
        long filteringLatency = System.currentTimeMillis() - filteringStart;
        Assert.assertTrue(filteringLatency <= 200, "Filtering latency exceeded 200 ms: " + filteringLatency + " ms");

        // Step 4: Compare the filtered data to the 80 km threshold within 100 ms
        long comparisonStart = System.currentTimeMillis();
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.cssSelector("[data-testid='threshold-comparison']"), "below"));
        long comparisonLatency = System.currentTimeMillis() - comparisonStart;
        Assert.assertTrue(comparisonLatency <= 100, "Comparison latency exceeded 100 ms: " + comparisonLatency + " ms");

        // Step 5: Activate the low fuel warning icon within 1.6 seconds
        long activationStart = System.currentTimeMillis();
        WebElement warningIcon = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='low-fuel-warning']")));
        long activationLatency = System.currentTimeMillis() - activationStart;
        Assert.assertTrue(activationLatency <= 1600, "Activation latency exceeded 1.6 s: " + activationLatency + " ms");

        // Step 6: Measure total latency from fuel drop to warning icon
        long totalLatency = sensorLatency + acquisitionLatency + filteringLatency + comparisonLatency + activationLatency;
        Assert.assertTrue(totalLatency <= 2000, "Total latency exceeded 2.0 s: " + totalLatency + " ms");

        // Postconditions: warning icon is visible
        Assert.assertTrue(warningIcon.isDisplayed(), "Low fuel warning icon is not visible");
    }
}