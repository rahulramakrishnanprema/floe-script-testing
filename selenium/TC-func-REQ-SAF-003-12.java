import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-SAF-003-12_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://vehicle-dashboard"); // placeholder URL
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-003-12() {
        // Locators (unknown, using TODO)
        By fuelInputLocator = By.cssSelector("[data-testid='TODO']"); // fuel level input
        By warningLocator = By.cssSelector("[data-testid='TODO']");   // low fuel warning indicator

        // Step 1: Reduce fuel level to 119 km
        WebElement fuelInput = driver.findElement(fuelInputLocator);
        fuelInput.clear();
        fuelInput.sendKeys("119");
        wait.until(ExpectedConditions.visibilityOfElementLocated(warningLocator));
        Assert.assertTrue(driver.findElement(warningLocator).isDisplayed(),
                "Low fuel warning should activate at 119 km");

        // Step 2: Increase fuel level to 121 km
        fuelInput.clear();
        fuelInput.sendKeys("121");
        wait.until(ExpectedConditions.invisibilityOfElementLocated(warningLocator));
        Assert.assertTrue(driver.findElements(warningLocator).isEmpty(),
                "Low fuel warning should clear at 121 km");

        // Step 3: Set fuel level to exactly 120 km
        fuelInput.clear();
        fuelInput.sendKeys("120");
        wait.until(ExpectedConditions.visibilityOfElementLocated(warningLocator));
        Assert.assertTrue(driver.findElement(warningLocator).isDisplayed(),
                "Low fuel warning should remain active at 120 km");

        // Step 4: Increase fuel level to 121 km
        fuelInput.clear();
        fuelInput.sendKeys("121");
        wait.until(ExpectedConditions.invisibilityOfElementLocated(warningLocator));
        Assert.assertTrue(driver.findElements(warningLocator).isEmpty(),
                "Low fuel warning should clear at 121 km after 120 km");
    }
}