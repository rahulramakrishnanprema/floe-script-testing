import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-RD-004-18_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://example.com");
    }

    @Test
    public void test_TC-func-REQ-RD-004-18() {
        // Step 1: Power off vehicle and wait for ECU to shut down
        WebElement powerOffButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        powerOffButton.click();
        WebElement shutdownStatus = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertEquals(shutdownStatus.getText(), "ECU saves current state to non-volatile memory");

        // Step 2: Power on vehicle and allow ECU to initialize
        WebElement powerOnButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        powerOnButton.click();
        WebElement initStatus = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertEquals(initStatus.getText(), "ECU loads learned profile from non-volatile memory");

        // Step 3: Query current consumption profile from ECU
        WebElement queryButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        queryButton.click();
        WebElement profileResult = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertEquals(profileResult.getText(), "ECU returns the same learned profile as before power off");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}