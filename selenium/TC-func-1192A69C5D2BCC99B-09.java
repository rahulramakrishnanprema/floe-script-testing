import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.net.*;
import java.io.*;
import org.json.JSONObject;

public class TC-func-1192A69C5D2BCC99B-09_Test {
    private WebDriver driver;
    private WebDriverWait wait;
    private String baseUrl = "http://localhost:8080";

    @BeforeClass
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, 10);
        driver.get(baseUrl);
    }

    @Test
    public void test_TC-func-1192A69C5D2BCC99B-09() throws Exception {
        // Step 1: Send GET request to /active-consumption-profile endpoint
        URL url = new URL(baseUrl + "/active-consumption-profile");
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

        // Step 2: Verify response JSON contains expected values
        JSONObject json = new JSONObject(content.toString());
        double fuelRemainingLiters = json.getDouble("fuelRemainingLiters");
        double averageConsumption = json.getDouble("averageConsumption");
        int estimatedRangeKm = json.getInt("estimatedRangeKm");
        String calculationBasis = json.getString("calculationBasis");

        Assert.assertEquals(fuelRemainingLiters, 5.0, "fuelRemainingLiters should be 5");
        Assert.assertEquals(averageConsumption, 7.5, "averageConsumption should be 7.5");
        Assert.assertEquals(estimatedRangeKm, 67, "estimatedRangeKm should be 67");
        Assert.assertEquals(calculationBasis, "PROFILE_AVERAGE", "calculationBasis should be PROFILE_AVERAGE");
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}