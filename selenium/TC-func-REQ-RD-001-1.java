import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-RD-001-1_Test {

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
    public void test_TC-func-REQ-RD-001-1() {
        // Step 1: System reads fuel quantity from sensor
        WebElement fuelQtyElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='fuel-quantity']")));
        String fuelQtyText = fuelQtyElement.getText();
        Assert.assertEquals(fuelQtyText, "30 L", "Fuel quantity should be 30 L");

        // Step 2: System retrieves vehicle profile consumption 8 L/100km
        WebElement consumptionElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='vehicle-consumption']")));
        String consumptionText = consumptionElement.getText();
        Assert.assertEquals(consumptionText, "8 L/100km", "Consumption should be 8 L/100km");

        // Step 3: System calculates remaining range using formula
        WebElement rangeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='remaining-range']")));
        String rangeText = rangeElement.getText();
        Assert.assertEquals(rangeText, "375 km", "Remaining range should be 375 km");

        // Step 4: System compares remaining range to 80 km threshold
        // Verify no low fuel warning displayed
        boolean isWarningDisplayed = driver.findElements(By.cssSelector("[data-testid='low-fuel-warning']")).size() > 0;
        Assert.assertFalse(isWarningDisplayed, "No low fuel warning should be displayed");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}