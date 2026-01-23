import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-1192A69C5D2BCC8FC-04_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void test_TC-func-1192A69C5D2BCC8FC-04() {
        driver.get("http://example.com/sensor");

        // Step 1: Send a raw voltage of 3.0 volts to the system
        By voltageInput = By.cssSelector("[data-testid='TODO']");
        wait.until(ExpectedConditions.elementToBeClickable(voltageInput));
        driver.findElement(voltageInput).sendKeys("3.0");

        By submitButton = By.cssSelector("[data-testid='TODO']");
        wait.until(ExpectedConditions.elementToBeClickable(submitButton));
        driver.findElement(submitButton).click();

        // Step 2: Wait 200 milliseconds before sending next reading
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Step 3: System returns JSON response
        By responseElement = By.cssSelector("[data-testid='TODO']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(responseElement));
        String jsonResponse = driver.findElement(responseElement).getText();

        Assert.assertTrue(jsonResponse.contains("\"status\":\"REJECTED\""),
                "Expected status REJECTED due to low sampling frequency");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}