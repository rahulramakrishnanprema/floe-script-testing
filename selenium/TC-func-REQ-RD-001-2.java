import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class TC-func-REQ-RD-001-2_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        // Set path to chromedriver executable if necessary
        // System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("http://example.com"); // Replace with actual URL
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void test_TC-func-REQ-RD-001-2() {
        // Step 1: System reads fuel quantity from sensor
        WebElement fuelQtyElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-testid='fuel-quantity']")));
        String fuelQtyText = fuelQtyElement.getText();
        Assert.assertEquals(fuelQtyText, "6 L", "Fuel quantity should be 6 L");

        // Step 2: System retrieves vehicle profile consumption
        WebElement consumptionElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-testid='vehicle-consumption']")));
        String consumptionText = consumptionElement.getText();
        Assert.assertEquals(consumptionText, "7.5 L/100km", "Vehicle consumption should be 7.5 L/100km");

        // Step 3: System calculates remaining range
        WebElement rangeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-testid='remaining-range']")));
        String rangeText = rangeElement.getText();
        Assert.assertEquals(rangeText, "80 km", "Remaining range should be 80 km");

        // Step 4: System compares remaining range to 80 km threshold
        WebElement warningElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-testid='low-fuel-warning']")));
        String warningText = warningElement.getText();
        Assert.assertTrue(warningText.contains("Low fuel warning"), "Low fuel warning should be displayed");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}