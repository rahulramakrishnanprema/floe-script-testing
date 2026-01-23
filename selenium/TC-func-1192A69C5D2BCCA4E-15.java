import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
import java.util.Map;

public class TC-func-1192A69C5D2BCCA4E-15_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void test_TC-func-1192A69C5D2BCCA4E-15() {
        driver.get("http://localhost");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid='TODO']")));

        JavascriptExecutor js = (JavascriptExecutor) driver;
        String script =
            "var callback = arguments[arguments.length - 1];" +
            "fetch('/warning/evaluate', {" +
            "  method: 'POST'," +
            "  headers: {'Content-Type': 'application/json'}," +
            "  body: JSON.stringify({estimatedRangeKm: 80})" +
            "}).then(r => r.json()).then(data => callback(data)).catch(err => callback({error: err}));";

        Object responseObj = js.executeAsyncScript(script);
        Assert.assertNotNull(responseObj, "Response should not be null");

        @SuppressWarnings("unchecked")
        Map<String, Object> response = (Map<String, Object>) responseObj;

        String warningState = (String) response.get("warningState");
        String reason = (String) response.get("reason");
        Boolean warningActive = (Boolean) response.get("warningActive");

        Assert.assertEquals(warningState, "ACTIVE", "warningState should be ACTIVE");
        Assert.assertEquals(reason, "RANGE_BELOW_ACTIVATION_THRESHOLD", "reason should be RANGE_BELOW_ACTIVATION_THRESHOLD");
        Assert.assertTrue(warningActive, "warningActive should be true");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}