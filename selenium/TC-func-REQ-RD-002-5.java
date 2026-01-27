import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.util.List;
import java.util.ArrayList;
import java.time.Duration;

public class TC-func-REQ-RD-002-5_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void test_TC-func-REQ-RD-002-5() {
        // Step 1: Start vehicle ignition
        By ignitionButton = By.cssSelector("[data-testid='ignition-button']");
        wait.until(ExpectedConditions.elementToBeClickable(ignitionButton)).click();

        // Verify ignition state changes to ON
        By ignitionState = By.cssSelector("[data-testid='ignition-state']");
        String stateText = wait.until(ExpectedConditions.visibilityOfElementLocated(ignitionState)).getText();
        Assert.assertEquals(stateText, "ON", "Ignition state should be ON");

        // Step 2: Record timestamps of sensor readings for 1 second
        By sensorReading = By.cssSelector("[data-testid='sensor-reading']");
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(sensorReading));

        List<Long> timestamps = new ArrayList<>();
        long startTime = System.currentTimeMillis();
        while (System.currentTimeMillis() - startTime < 1000) {
            List<WebElement> currentReadings = driver.findElements(sensorReading);
            for (WebElement elem : currentReadings) {
                String timeStr = elem.getAttribute("data-timestamp");
                if (timeStr != null) {
                    try {
                        long ts = Long.parseLong(timeStr);
                        if (!timestamps.contains(ts)) {
                            timestamps.add(ts);
                        }
                    } catch (NumberFormatException e) {
                        // ignore malformed timestamp
                    }
                }
            }
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        // Step 3: Count number of readings
        int readingCount = timestamps.size();
        Assert.assertTrue(readingCount >= 10, "Number of sensor readings should be at least 10, but was " + readingCount);
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}