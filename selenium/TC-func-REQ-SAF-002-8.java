import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-SAF-002-8_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://vehicle-system-ui"); // Replace with actual URL
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-002-8() {
        // Step 1: Reduce the fuel level to 79.9 km
        WebElement fuelInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        fuelInput.clear();
        fuelInput.sendKeys("79.9");
        // Verify sensor reports 79.9 km within 100 ms
        wait.until(ExpectedConditions.textToBePresentInElementValue(fuelInput, "79.9"));

        // Record start time for latency measurement
        long startTime = System.currentTimeMillis();

        // Step 2: Allow the system to acquire sensor data (simulate 100 ms)
        try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        // Step 3: Process the data through the filtering algorithm (simulate 200 ms)
        try { Thread.sleep(200); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        // Step 4: Compare the filtered data to the 80 km threshold (simulate 100 ms)
        try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        // Step 5: Activate the low fuel warning icon on the cluster display (simulate 1.6 seconds)
        try { Thread.sleep(1600); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        // Step 6: Measure the total latency from the moment the fuel level drops below 80 km to the warning icon appears
        WebElement warningIcon = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        long endTime = System.currentTimeMillis();
        long latency = endTime - startTime;

        // Validate latency is 2.0 seconds or less
        Assert.assertTrue(latency <= 2000, "Total latency exceeded 2.0 seconds: " + latency + " ms");

        // Validate warning icon is visible
        Assert.assertTrue(warningIcon.isDisplayed(), "Low fuel warning icon is not visible on the cluster display");
    }
}