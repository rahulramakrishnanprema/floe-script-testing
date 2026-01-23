import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
import java.util.Map;

public class TC-func-1192A69C5D2BCC9E5-11_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-1192A69C5D2BCC9E5-11() {
        driver.get("about:blank");
        wait.until(webDriver -> ((JavascriptExecutor) webDriver).executeScript("return document.readyState").equals("complete"));

        String script = "return fetch('/updateConsumption', {" +
                "method: 'POST'," +
                "headers: {'Content-Type': 'application/json'}," +
                "body: JSON.stringify({distanceKm:0, fuelUsedLiters:0, drivingCondition:'CITY'})" +
                "}).then(r => {" +
                "return r.text().then(text => {" +
                "return {status: r.status, body: text};" +
                "});" +
                "});";

        Map<String, Object> result = (Map<String, Object>) ((JavascriptExecutor) driver).executeScript(script);

        int status = ((Long) result.get("status")).intValue();
        String body = (String) result.get("body");

        Assert.assertEquals(status, 200, "HTTP status should be 200");
        Assert.assertTrue(body.contains("\"updated\":true"), "Response should contain updated:true");
        Assert.assertTrue(body.contains("\"adaptationStatus\":\"IN_PROGRESS\""), "Response should contain adaptationStatus IN_PROGRESS");
    }
}