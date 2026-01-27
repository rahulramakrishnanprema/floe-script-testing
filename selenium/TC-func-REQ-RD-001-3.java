import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-RD-001-3_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://example.com"); // Replace with actual URL
    }

    @Test
    public void test_TC-func-REQ-RD-001-3() {
        // Step 1: System reads fuel quantity from sensor
        By fuelQtyLocator = By.cssSelector("[data-testid='fuel-quantity']");
        WebElement fuelQtyElement = wait.until(ExpectedConditions.visibilityOfElementLocated(fuelQtyLocator));
        String fuelQtyText = fuelQtyElement.getText(); // e.g., "20 L"
        double fuelQty = parseNumber(fuelQtyText);
        Assert.assertEquals(fuelQty, 20.0, 0.01, "Fuel quantity should be 20 L");

        // Step 2: System checks for vehicle profile and finds none
        By consumptionProfileLocator = By.cssSelector("[data-testid='consumption-profile']");
        WebElement consumptionProfileElement = wait.until(ExpectedConditions.visibilityOfElementLocated(consumptionProfileLocator));
        String consumptionProfileText = consumptionProfileElement.getText(); // e.g., "7.5 L/100km"
        double consumptionProfile = parseNumber(consumptionProfileText);
        Assert.assertEquals(consumptionProfile, 7.5, 0.01, "Default consumption profile should be 7.5 L/100km");

        // Step 3: System calculates remaining range
        By remainingRangeLocator = By.cssSelector("[data-testid='remaining-range']");
        WebElement remainingRangeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(remainingRangeLocator));
        String remainingRangeText = remainingRangeElement.getText(); // e.g., "266.67 km"
        double remainingRange = parseNumber(remainingRangeText);
        Assert.assertEquals(remainingRange, 266.67, 0.5, "Remaining range should be approximately 266.67 km");

        // Step 4: System compares remaining range to 80 km threshold
        By lowFuelWarningLocator = By.cssSelector("[data-testid='low-fuel-warning']");
        boolean isLowFuelWarningDisplayed = driver.findElements(lowFuelWarningLocator).stream()
                .anyMatch(WebElement::isDisplayed);
        Assert.assertFalse(isLowFuelWarningDisplayed, "Low fuel warning should not be displayed");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    private double parseNumber(String text) {
        String number = text.replaceAll("[^0-9.]", "");
        return Double.parseDouble(number);
    }
}