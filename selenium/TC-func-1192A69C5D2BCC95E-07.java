import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-1192A69C5D2BCC95E-07_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, 10);
    }

    @Test
    public void test_TC-func-1192A69C5D2BCC95E-07() {
        // Step 1: Send GET request to /active-consumption-profile endpoint
        driver.get("http://example.com/active-consumption-profile");

        // Wait until the page source contains the expected key to ensure the response is loaded
        wait.until((WebDriver d) -> d.getPageSource().contains("fuelRemainingLiters"));

        String pageSource = driver.getPageSource();

        // Step 2: Verify response JSON contains expected values
        Assert.assertTrue(pageSource.contains("\"fuelRemainingLiters\":8.5"), "fuelRemainingLiters should be 8.5");
        Assert.assertTrue(pageSource.contains("\"averageConsumption\":7.1"), "averageConsumption should be 7.1");
        Assert.assertTrue(pageSource.contains("\"estimatedRangeKm\":85"), "estimatedRangeKm should be 85");
        Assert.assertTrue(pageSource.contains("\"calculationBasis\":\"LAST_100_KM\""), "calculationBasis should be LAST_100_KM");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}