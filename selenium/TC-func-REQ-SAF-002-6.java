import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-SAF-002-6_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://example.com"); // Placeholder URL
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-002-6() {
        // Record the time when fuel level drops below threshold
        long startTime = System.currentTimeMillis();

        // Step 1: Reduce the fuel level to 79 km
        WebElement fuelInput = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-testid='fuel-level-input']")));
        fuelInput.clear();
        fuelInput.sendKeys("79");
        // Verify sensor reports 79 km within 100 ms
        long sensorStart = System.currentTimeMillis();
        wait.until(ExpectedConditions.textToBePresentInElementLocated(
                By.cssSelector("[data-testid='fuel-level-display']"), "79"));
        long sensorEnd = System.currentTimeMillis();
        Assert.assertTrue(sensorEnd - sensorStart <= 100,
                "Sensor reporting delay exceeded 100 ms");

        // Step 2: Allow the system to acquire sensor data
        try { Thread.sleep(100); } catch (InterruptedException ignored) {}
        long acquisitionStart = System.currentTimeMillis();
        wait.until(ExpectedConditions.textToBePresentInElementLocated(
                By.cssSelector("[data-testid='acquisition-status']"), "Complete"));
        long acquisitionEnd = System.currentTimeMillis();
        Assert.assertTrue(acquisitionEnd - acquisitionStart <= 100,
                "Sensor acquisition delay exceeded 100 ms");

        // Step 3: Process the data through the filtering algorithm
        try { Thread.sleep(200); } catch (InterruptedException ignored) {}
        long filteringStart = System.currentTimeMillis();
        wait.until(ExpectedConditions.textToBePresentInElementLocated(
                By.cssSelector("[data-testid='filtering-status']"), "Complete"));
        long filteringEnd = System.currentTimeMillis();
        Assert.assertTrue(filteringEnd - filteringStart <= 200,
                "Data filtering delay exceeded 200 ms");

        // Step 4: Compare the filtered data to the 80 km threshold
        try { Thread.sleep(100); } catch (InterruptedException ignored) {}
        long thresholdStart = System.currentTimeMillis();
        wait.until(ExpectedConditions.textToBePresentInElementLocated(
                By.cssSelector("[data-testid='threshold-status']"), "Below"));
        long thresholdEnd = System.currentTimeMillis();
        Assert.assertTrue(thresholdEnd - thresholdStart <= 100,
                "Threshold comparison delay exceeded 100 ms");

        // Step 5: Activate the low fuel warning icon on the cluster display
        try { Thread.sleep(1600); } catch (InterruptedException ignored) {}
        long warningStart = System.currentTimeMillis();
        WebElement warningIcon = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-testid='low-fuel-warning']")));
        long warningEnd = System.currentTimeMillis();
        Assert.assertTrue(warningEnd - warningStart <= 1600,
                "Warning icon activation delay exceeded 1.6 seconds");

        // Step 6: Measure total latency from fuel drop to warning icon appearance
        long endTime = System.currentTimeMillis();
        long totalLatency = endTime - startTime;
        Assert.assertTrue(totalLatency <= 2000,
                "Total latency exceeded 2.0 seconds: " + totalLatency + " ms");

        // Postconditions verification
        Assert.assertTrue(warningIcon.isDisplayed(),
                "Low fuel warning icon is not visible on the cluster display");
    }
}