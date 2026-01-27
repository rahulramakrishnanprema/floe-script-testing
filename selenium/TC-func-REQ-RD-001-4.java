import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-RD-001-4_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://example.com/vehicle-dashboard");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-RD-001-4() {
        // Step 1: System reads fuel quantity from sensor
        By fuelQtySelector = By.cssSelector("[data-testid='fuel-quantity']");
        WebElement fuelQtyElement = wait.until(ExpectedConditions.visibilityOfElementLocated(fuelQtySelector));
        String fuelQtyText = fuelQtyElement.getText().trim();
        Assert.assertEquals(fuelQtyText, "5 L", "Fuel quantity should be 5 L");

        // Step 2: System retrieves vehicle profile consumption
        By consumptionSelector = By.cssSelector("[data-testid='vehicle-consumption']");
        WebElement consumptionElement = wait.until(ExpectedConditions.visibilityOfElementLocated(consumptionSelector));
        String consumptionText = consumptionElement.getText().trim();
        Assert.assertEquals(consumptionText, "9 L/100km", "Vehicle consumption should be 9 L/100km");

        // Step 3: System calculates remaining range
        double fuelQty = Double.parseDouble(fuelQtyText.replace(" L", ""));
        double consumption = Double.parseDouble(consumptionText.replace(" L/100km", ""));
        double expectedRange = (fuelQty / consumption) * 100;
        expectedRange = Math.round(expectedRange * 100.0) / 100.0; // round to 2 decimals

        By rangeSelector = By.cssSelector("[data-testid='remaining-range']");
        WebElement rangeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(rangeSelector));
        String rangeText = rangeElement.getText().trim();
        Assert.assertEquals(rangeText, expectedRange + " km", "Remaining range should be " + expectedRange + " km");

        // Step 4: System compares remaining range to 80 km threshold
        By warningSelector = By.cssSelector("[data-testid='low-fuel-warning']");
        WebElement warningElement = wait.until(ExpectedConditions.visibilityOfElementLocated(warningSelector));
        Assert.assertTrue(warningElement.isDisplayed(), "Low fuel warning should be displayed");
    }
}