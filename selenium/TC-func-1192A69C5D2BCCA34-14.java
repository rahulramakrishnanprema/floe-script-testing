import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class TC-func-1192A69C5D2BCCA34-14_Test {

    @Test
    public void test_TC-func-1192A69C5D2BCCA34-14() {
        WebDriver driver = new ChromeDriver();
        try {
            // Preconditions: Vehicle powered on, warning system enabled, thresholds set, current range 120 km
            // Navigate to the warning status endpoint
            String url = "http://example.com/warning/status";
            driver.get(url);

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            wait.until(webDriver -> webDriver.getPageSource().contains("warningActive"));

            String pageSource = driver.getPageSource();

            // Validate warningActive is false
            Assert.assertTrue(pageSource.contains("\"warningActive\":false"),
                    "Expected warningActive to be false");

            // Validate activationThresholdKm is 80
            Assert.assertTrue(pageSource.contains("\"activationThresholdKm\":80"),
                    "Expected activationThresholdKm to be 80");

            // Validate deactivationThresholdKm is 90
            Assert.assertTrue(pageSource.contains("\"deactivationThresholdKm\":90"),
                    "Expected deactivationThresholdKm to be 90");

            // Validate currentRangeKm is 120
            Assert.assertTrue(pageSource.contains("\"currentRangeKm\":120"),
                    "Expected currentRangeKm to be 120");

            // Postconditions: No warning displayed, system shows current range correctly
            // Since we are only validating the JSON response, no additional UI checks are performed here.

        } finally {
            driver.quit();
        }
    }
}