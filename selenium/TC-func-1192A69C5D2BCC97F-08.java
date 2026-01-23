import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-1192A69C5D2BCC97F-08_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void test_TC-func-1192A69C5D2BCC97F-08() {
        try {
            driver.get("http://example.com/active-consumption-profile");

            // Wait until the JSON response contains the expected key
            wait.until(new ExpectedCondition<Boolean>() {
                public Boolean apply(WebDriver d) {
                    return d.getPageSource().contains("\"fuelRemainingLiters\"");
                }
            });

            String pageSource = driver.getPageSource();

            // Validate the JSON values
            Assert.assertTrue(pageSource.contains("\"fuelRemainingLiters\":10"), "Expected fuelRemainingLiters to be 10");
            Assert.assertTrue(pageSource.contains("\"averageConsumption\":8.0"), "Expected averageConsumption to be 8.0");
            Assert.assertTrue(pageSource.contains("\"estimatedRangeKm\":125"), "Expected estimatedRangeKm to be 125");
            Assert.assertTrue(pageSource.contains("\"calculationBasis\":\"DEFAULT_CONSUMPTION\""), "Expected calculationBasis to be DEFAULT_CONSUMPTION");
        } finally {
            if (driver != null) {
                driver.quit();
            }
        }
    }
}