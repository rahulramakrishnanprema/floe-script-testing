import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.util.Map;

public class TC-func-1192A69C5D2BCCA68-16_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, 10);
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-1192A69C5D2BCCA68-16() {
        // Precondition: The warning is currently active, the vehicle is powered on,
        // activation threshold is 80 km, deactivation threshold is 90 km,
        // and the current estimated range is 90 km.

        // Step 1: Send POST request to /warning/evaluate with body {estimatedRangeKm:90}
        String script = "return fetch('/warning/evaluate', {" +
                "method:'POST'," +
                "headers:{'Content-Type':'application/json'}," +
                "body:JSON.stringify({estimatedRangeKm:90})" +
                "}).then(r=>r.json());";

        Object response = ((JavascriptExecutor) driver).executeScript(script);
        Map<String, Object> json = (Map<String, Object>) response;

        // Expected: warningState INACTIVE and reason RANGE_ABOVE_DEACTIVATION_THRESHOLD
        Assert.assertEquals(json.get("warningState"), "INACTIVE");
        Assert.assertEquals(json.get("reason"), "RANGE_ABOVE_DEACTIVATION_THRESHOLD");

        // Postcondition: Warning is inactive, no warning indicator is displayed
        By warningIndicator = By.cssSelector("[data-testid='TODO']");
        // Wait until the warning indicator is not visible
        wait.until(ExpectedConditions.invisibilityOfElementLocated(warningIndicator));
    }
}