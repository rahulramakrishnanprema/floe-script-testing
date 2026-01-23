import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;
import java.util.Map;

public class TC-func-1192A69C5D2BCC9B7-10_Test {

    @Test
    public void test_TC-func-1192A69C5D2BCC9B7-10() {
        WebDriver driver = new ChromeDriver();
        try {
            // Navigate to base URL
            driver.get("http://localhost");

            // Send POST request via JavaScript
            String script =
                "fetch('/updateConsumption', {" +
                "  method:'POST'," +
                "  headers:{'Content-Type':'application/json'}," +
                "  body:JSON.stringify({" +
                "    distanceKm:25," +
                "    fuelUsedLiters:1.8," +
                "    drivingCondition:'CITY'" +
                "  })" +
                "})" +
                ".then(r=>{window.testStatus=r.status; return r.json();})" +
                ".then(data=>{window.testResponse=data;});";
            driver.executeScript(script);

            // Wait for response to be available
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            wait.until(d -> {
                Object res = d.executeScript("return typeof window.testResponse !== 'undefined';");
                return Boolean.TRUE.equals(res);
            });

            // Retrieve status and response
            Long status = (Long) driver.executeScript("return window.testStatus;");
            @SuppressWarnings("unchecked")
            Map<String, Object> response = (Map<String, Object>) driver.executeScript("return window.testResponse;");

            // Validate HTTP status code
            Assert.assertEquals(status.intValue(), 200, "Expected HTTP 200 response");

            // Validate response body
            Assert.assertTrue((Boolean) response.get("updated"), "Expected 'updated' to be true");
            Assert.assertEquals(response.get("adaptationStatus"), "IN_PROGRESS", "Expected adaptationStatus to be 'IN_PROGRESS'");

        } finally {
            driver.quit();
        }
    }
}