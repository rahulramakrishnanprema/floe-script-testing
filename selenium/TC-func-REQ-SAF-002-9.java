import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-SAF-002-9_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        driver.get("http://example.com"); // Placeholder URL for the HMI cluster display
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-002-9() {
        long overallStart = System.currentTimeMillis();

        // Step 1: Verify the fuel level sensor reports 79.9 km
        long stepStart = System.currentTimeMillis();
        By fuelLevelSelector = By.cssSelector("[data-testid='fuel-level']");
        wait.until(ExpectedConditions.textToBePresentInElementLocated(fuelLevelSelector, "79.9 km"));
        String fuelLevelText = driver.findElement(fuelLevelSelector).getText();
        Assert.assertEquals(fuelLevelText, "79.9 km", "Sensor reports 79.9 km");
        long stepDuration = System.currentTimeMillis() - stepStart;
        Assert.assertTrue(stepDuration <= 100, "Step 1 within 100 ms");

        // Step 2: Allow the system to acquire sensor data
        stepStart = System.currentTimeMillis();
        By sensorAcquisitionSelector = By.cssSelector("[data-testid='sensor-acquisition']");
        wait.until(ExpectedConditions.textToBePresentInElementLocated(sensorAcquisitionSelector, "acquired"));
        String acquisitionStatus = driver.findElement(sensorAcquisitionSelector).getText();
        Assert.assertEquals(acquisitionStatus, "acquired", "Sensor acquisition completes");
        stepDuration = System.currentTimeMillis() - stepStart;
        Assert.assertTrue(stepDuration <= 100, "Step 2 within 100 ms");

        // Step 3: Process the data through the filtering algorithm
        stepStart = System.currentTimeMillis();
        By filterStatusSelector = By.cssSelector("[data-testid='filter-status']");
        wait.until(ExpectedConditions.textToBePresentInElementLocated(filterStatusSelector, "complete"));
        String filterStatus = driver.findElement(filterStatusSelector).getText();
        Assert.assertEquals(filterStatus, "complete", "Data filtering completes");
        stepDuration = System.currentTimeMillis() - stepStart;
        Assert.assertTrue(stepDuration <= 200, "Step 3 within 200 ms");

        // Step 4: Compare the filtered data to the 80 km threshold
        stepStart = System.currentTimeMillis();
        By comparisonStatusSelector = By.cssSelector("[data-testid='comparison-status']");
        wait.until(ExpectedConditions.textToBePresentInElementLocated(comparisonStatusSelector, "below"));
        String comparisonStatus = driver.findElement(comparisonStatusSelector).getText();
        Assert.assertEquals(comparisonStatus, "below", "Threshold comparison identifies below threshold");
        stepDuration = System.currentTimeMillis() - stepStart;
        Assert.assertTrue(stepDuration <= 100, "Step 4 within 100 ms");

        // Step 5: Activate the low fuel warning icon on the cluster display
        stepStart = System.currentTimeMillis();
        By warningIconSelector = By.cssSelector("[data-testid='warning-icon']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(warningIconSelector));
        WebElement warningIcon = driver.findElement(warningIconSelector);
        Assert.assertTrue(warningIcon.isDisplayed(), "Low fuel warning icon is displayed");
        stepDuration = System.currentTimeMillis() - stepStart;
        Assert.assertTrue(stepDuration <= 1600, "Step 5 within 1.6 seconds");

        // Step 6: Measure total latency from fuel level drop to warning icon appearance
        long totalLatency = System.currentTimeMillis() - overallStart;
        Assert.assertTrue(totalLatency <= 2000, "Total latency is 2.0 seconds or less");
        System.out.println("Measured latency: " + totalLatency + " ms");
    }
}