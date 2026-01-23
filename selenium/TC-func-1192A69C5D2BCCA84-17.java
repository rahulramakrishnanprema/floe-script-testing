import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
import java.util.List;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class TC-func-1192A69C5D2BCCA84-17_Test {
    private WebDriver driver;
    private WebDriverWait wait;
    private String baseUrl = "http://localhost";

    @BeforeClass
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get(baseUrl);
    }

    @Test
    public void test_TC-func-1192A69C5D2BCCA84-17() throws Exception {
        String url = baseUrl + "/warning/evaluate";
        String jsonBody = "{\"estimatedRangeKm\":85}";

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        Assert.assertEquals(response.statusCode(), 200);
        String responseBody = response.body();
        Assert.assertTrue(responseBody.contains("\"warningState\":\"INACTIVE\""));
        Assert.assertFalse(responseBody.contains("\"reason\""));

        List<WebElement> warningElements = driver.findElements(By.cssSelector("[data-testid='warning-indicator']"));
        Assert.assertTrue(warningElements.isEmpty());
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}