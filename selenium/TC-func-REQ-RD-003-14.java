import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-REQ-RD-003-14_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        // Set path to chromedriver if necessary
        // System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, 10);
        driver.manage().window().maximize();
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-RD-003-14() {
        // Navigate to the vehicle dashboard page
        driver.get("http://vehicle-dashboard-url"); // TODO: replace with actual URL

        // Precondition: Vehicle is powered on, Low fuel warning is inactive, Fuel level sensor reports 130 km
        // Assume there is a toggle to power on the vehicle
        WebElement powerToggle = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='power-toggle']")));
        powerToggle.click();

        // Set initial fuel level to 130 km
        WebElement fuelInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='fuel-level-input']")));
        fuelInput.clear();
        fuelInput.sendKeys("130");
        fuelInput.sendKeys(Keys.ENTER);

        // Verify low fuel warning is inactive
        By warningSelector = By.cssSelector("[data-testid='low-fuel-warning']");
        wait.until(ExpectedConditions.invisibilityOfElementLocated(warningSelector));

        // Step 1: Set fuel level sensor to 70 km
        fuelInput.clear();
        fuelInput.sendKeys("70");
        fuelInput.sendKeys(Keys.ENTER);

        // Expected: Low fuel warning activates immediately
        WebElement warningElement = wait.until(ExpectedConditions.visibilityOfElementLocated(warningSelector));
        Assert.assertTrue(warningElement.isDisplayed(), "Low fuel warning should be displayed after setting fuel to 70 km");

        // Step 2: Set fuel level sensor to 130 km
        fuelInput.clear();
        fuelInput.sendKeys("130");
        fuelInput.sendKeys(Keys.ENTER);

        // Expected: Low fuel warning remains inactive until 120 km threshold is reached
        // Wait to ensure warning does not appear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(warningSelector));
        Assert.assertFalse(driver.findElements(warningSelector).size() > 0, "Low fuel warning should remain inactive after setting fuel to 130 km");

        // Postcondition: Low fuel warning remains inactive after final step
        // Verify again that warning is not displayed
        Assert.assertFalse(driver.findElements(warningSelector).size() > 0, "Low fuel warning should remain inactive after final step");
    }
}