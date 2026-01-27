import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-REQ-SAF-002-11_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        // Assuming chromedriver is in system PATH
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, 10);
        // Navigate to the vehicle HMI cluster simulation page
        driver.get("http://localhost:8080/hmi-cluster");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-002-11() {
        // Step 1: Force the fuel level sensor to output -999 km
        // Assume there is a hidden input or button to set sensor value
        By setSensorButton = By.cssSelector("[data-testid='set-sensor']");
        wait.until(ExpectedConditions.elementToBeClickable(setSensorButton)).click();

        // Verify sensor reports -999 km within 100 ms
        By sensorReading = By.cssSelector("[data-testid='sensor-reading']");
        String readingText = wait.until(ExpectedConditions.textToBePresentInElementLocated(sensorReading, "-999 km")) ? driver.findElement(sensorReading).getText() : "";
        Assert.assertTrue(readingText.contains("-999 km"), "Sensor did not report -999 km");

        // Step 2: Allow the system to acquire sensor data
        // Wait for acquisition status to be 'complete'
        By acquisitionStatus = By.cssSelector("[data-testid='acquisition-status']");
        String acquisitionText = wait.until(ExpectedConditions.textToBePresentInElementLocated(acquisitionStatus, "complete")) ? driver.findElement(acquisitionStatus).getText() : "";
        Assert.assertTrue(acquisitionText.contains("complete"), "Sensor acquisition did not complete");

        // Step 3: Process the data through the filtering algorithm
        By filteringStatus = By.cssSelector("[data-testid='filtering-status']");
        String filteringText = wait.until(ExpectedConditions.textToBePresentInElementLocated(filteringStatus, "complete")) ? driver.findElement(filteringStatus).getText() : "";
        Assert.assertTrue(filteringText.contains("complete"), "Data filtering did not complete");

        // Step 4: Compare the filtered data to the 80 km threshold
        // Assume there is a hidden element that shows comparison result
        By comparisonResult = By.cssSelector("[data-testid='comparison-result']");
        String comparisonText = wait.until(ExpectedConditions.textToBePresentInElementLocated(comparisonResult, "out of range")) ? driver.findElement(comparisonResult).getText() : "";
        Assert.assertTrue(comparisonText.contains("out of range"), "Threshold comparison did not identify out of range");

        // Step 5: Verify that the low fuel warning icon does not appear on the cluster display
        By warningIcon = By.cssSelector("[data-testid='low-fuel-warning']");
        try {
            // Wait for a short period to see if the icon appears
            wait.withTimeout(Duration.ofSeconds(2)).until(ExpectedConditions.visibilityOfElementLocated(warningIcon));
            // If we reach here, the icon is visible, which is a failure
            Assert.fail("Low fuel warning icon appeared when it should not");
        } catch (TimeoutException e) {
            // Expected: icon not visible
            Assert.assertTrue(true, "Low fuel warning icon is not displayed as expected");
        }
    }
}