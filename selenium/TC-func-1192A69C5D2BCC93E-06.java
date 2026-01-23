import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-1192A69C5D2BCC93E-06_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://localhost");
    }

    @Test
    public void test_TC-func-1192A69C5D2BCC93E-06() {
        // Step 1: Send a raw voltage corresponding to 40.4 liters to the system
        WebElement voltageInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        voltageInput.clear();
        voltageInput.sendKeys("40.4");
        // Assuming there is a submit button to trigger processing
        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        submitButton.click();

        // Step 2: Verify system accepts the reading
        WebElement statusElement = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        String statusText = statusElement.getText();
        Assert.assertTrue(statusText.contains("ACCEPTED"), "Expected status to contain ACCEPTED");

        // Step 3: Verify JSON response contains fuelQuantityLiters 40.4 and status ACCEPTED
        WebElement jsonResponseElement = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        String jsonResponse = jsonResponseElement.getText();
        Assert.assertTrue(jsonResponse.contains("\"fuelQuantityLiters\": 40.4"), "JSON should contain fuelQuantityLiters 40.4");
        Assert.assertTrue(jsonResponse.contains("\"status\": \"ACCEPTED\""), "JSON should contain status ACCEPTED");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}