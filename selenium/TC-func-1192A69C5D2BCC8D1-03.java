import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-1192A69C5D2BCC8D1-03_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://localhost:8080"); // replace with actual URL
    }

    @Test
    public void test_TC-func-1192A69C5D2BCC8D1-03() {
        // Step 1: Send a raw voltage of 4.6 volts to the system
        WebElement voltageInput = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-testid='TODO']")));
        voltageInput.clear();
        voltageInput.sendKeys("4.6");

        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.cssSelector("[data-testid='TODO']")));
        submitButton.click();

        // Step 2: System returns JSON response
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-testid='TODO']")));
        String responseText = responseElement.getText();
        Assert.assertTrue(responseText.contains("REJECTED"),
                "Response should contain status REJECTED");

        // Verify last valid reading remains unchanged
        WebElement lastReadingElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-testid='TODO']")));
        String lastReading = lastReadingElement.getText();
        Assert.assertEquals(lastReading, "38.4 liters",
                "Last valid reading should remain unchanged");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}