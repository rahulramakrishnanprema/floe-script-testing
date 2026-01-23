import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

public class TC-func-1192A69C5D2BCCA1B-13_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        // Set path to chromedriver executable
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Navigate to a placeholder page to satisfy Selenium usage
        driver.get("http://localhost:8080");
    }

    @Test
    public void test_TC-func-1192A69C5D2BCCA1B-13() throws IOException {
        // Prepare POST request to /updateConsumption
        URL url = new URL("http://localhost:8080/updateConsumption");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json; utf-8");
        conn.setDoOutput(true);

        String jsonBody = "{\"distanceKm\":15,\"fuelUsedLiters\":1.2}";
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        // Wait for response
        int statusCode = conn.getResponseCode();
        Assert.assertEquals(statusCode, 400, "Expected HTTP 400 response");

        // Read error message from response body
        StringBuilder responseBuilder = new StringBuilder();
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(conn.getErrorStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                responseBuilder.append(line.trim());
            }
        }
        String responseBody = responseBuilder.toString();
        Assert.assertTrue(responseBody.contains("drivingCondition is required"),
                "Error message 'drivingCondition is required' not found in response");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}