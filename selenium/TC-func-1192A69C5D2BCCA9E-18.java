import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class TC-func-1192A69C5D2BCCA9E-18_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void test_TC-func-1192A69C5D2BCCA9E-18() {
        // Step 1: Simulate ignition OFF and then ON
        // Assuming there are controls to toggle ignition; using placeholder selector
        WebElement ignitionToggle = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        ignitionToggle.click(); // turn OFF
        // Wait for system to power down
        try { Thread.sleep(2000); } catch (InterruptedException e) {}
        ignitionToggle.click(); // turn ON
        // Wait for system to power up
        try { Thread.sleep(2000); } catch (InterruptedException e) {}

        // Step 2: Send GET request to /warning/status
        try {
            URL url = new URL("http://vehicle.api.local/warning/status");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            int responseCode = conn.getResponseCode();
            Assert.assertEquals(responseCode, 200, "Expected HTTP 200 response");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            conn.disconnect();
            String jsonResponse = content.toString();
            Assert.assertTrue(jsonResponse.contains("\"warningActive\":true"), "Warning should remain active");
        } catch (Exception e) {
            Assert.fail("Exception during GET request: " + e.getMessage());
        }
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}