import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-REQ-SAF-001-3_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        // Set the path to your chromedriver executable
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Navigate to the application under test
        driver.get("http://example.com"); // Replace with actual URL
    }

    @Test
    public void test_TC-func-REQ-SAF-001-3() {
        // Step 1: Verify fuel quantity displayed as 6 liters
        By fuelQuantitySelector = By.cssSelector("[data-testid='fuel-quantity']");
        WebElement fuelQuantityElement = wait.until(ExpectedConditions.visibilityOfElementLocated(fuelQuantitySelector));
        String fuelQuantityText = fuelQuantityElement.getText().trim();
        Assert.assertEquals(fuelQuantityText, "6 liters", "Fuel quantity should be 6 liters");

        // Step 2: Verify vehicle profile consumption displayed as 7.5 L/100km
        By vehicleProfileSelector = By.cssSelector("[data-testid='vehicle-profile-consumption']");
        WebElement vehicleProfileElement = wait.until(ExpectedConditions.visibilityOfElementLocated(vehicleProfileSelector));
        String vehicleProfileText = vehicleProfileElement.getText().trim();
        Assert.assertEquals(vehicleProfileText, "7.5 L/100km", "Vehicle profile consumption should be 7.5 L/100km");

        // Step 3: Verify estimated driving range calculated as 80 km
        By estimatedRangeSelector = By.cssSelector("[data-testid='estimated-range']");
        WebElement estimatedRangeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(estimatedRangeSelector));
        String estimatedRangeText = estimatedRangeElement.getText().trim();
        Assert.assertEquals(estimatedRangeText, "80 km", "Estimated range should be 80 km");

        // Step 4: Verify display shows 80 km
        // Already verified in step 3; additional check if needed
        Assert.assertTrue(estimatedRangeElement.isDisplayed(), "Estimated range element should be displayed");

        // Step 5: Verify low-fuel warning triggered because range <= 80 km
        By lowFuelWarningSelector = By.cssSelector("[data-testid='low-fuel-warning']");
        WebElement lowFuelWarningElement = wait.until(ExpectedConditions.visibilityOfElementLocated(lowFuelWarningSelector));
        Assert.assertTrue(lowFuelWarningElement.isDisplayed(), "Low-fuel warning should be displayed");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}