import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-1192A69C5D2BCC894-02_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeClass
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void test_TC-func-1192A69C5D2BCC894-02() {
        // Open the application page
        driver.get("http://example.com");

        // Step 1: Send a raw voltage of 0.4 volts to the system
        WebElement voltageInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        voltageInput.clear();
        voltageInput.sendKeys("0.4");

        // Assume there is a submit button to send the voltage
        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        submitButton.click();

        // Step 2: System returns JSON response
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        String responseText = responseElement.getText();

        // Validate that the response contains status REJECTED
        Assert.assertTrue(responseText.contains("REJECTED"), "Expected response to contain REJECTED status but got: " + responseText);
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}