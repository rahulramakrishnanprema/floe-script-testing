import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
import java.util.Map;

public class TC-func-1192A69C5D2BCCA01-12_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("about:blank");
        // Create a dummy element with unknown selector
        driver.executeScript("var el=document.createElement('div');el.setAttribute('data-testid','TODO');document.body.appendChild(el);");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid='TODO']")));
    }

    @Test
    public void test_TC-func-1192A69C5D2BCCA01-12() {
        String script =
            "var callback = arguments[arguments.length - 1];" +
            "fetch('/updateConsumption', {" +
            "method: 'POST'," +
            "headers: {'Content-Type': 'application/json'}," +
            "body: JSON.stringify({distanceKm:10, fuelUsedLiters:0.5, drivingCondition:'HIGHWAY'})" +
            "}).then(function(response) {" +
            "return response.json().then(function(json) {" +
            "callback({status: response.status, body: json});" +
            "});" +
            "}).catch(function(err) {callback({status: 0, body: null});});";

        @SuppressWarnings("unchecked")
        Map<String, Object> result = (Map<String, Object>) ((JavascriptExecutor) driver).executeAsyncScript(script);

        int status = ((Number) result.get("status")).intValue();
        Map<String, Object> body = (Map<String, Object>) result.get("body");

        Assert.assertEquals(status, 200, "Expected HTTP status 200");
        Assert.assertNotNull(body, "Response body should not be null");
        Assert.assertEquals(body.get("updated"), true, "Expected updated:true");
        Assert.assertEquals(body.get("adaptationStatus"), "IN_PROGRESS", "Expected adaptationStatus:IN_PROGRESS");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}