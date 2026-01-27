import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class TC-func-REQ-SAF-001-5_Test {
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
    public void test_TC-func-REQ-SAF-001-5() {
        // Step 1: System reads fuel quantity 20 liters
        By fuelQtySelector = By.cssSelector("[data-testid='TODO']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(fuelQtySelector));
        String fuelQtyText = driver.findElement(fuelQtySelector).getText();
        Assert.assertEquals(fuelQtyText, "20", "Fuel quantity recorded as 20 liters");

        // Step 2: System reads vehicle profile consumption 6.0 L/100km
        By consumptionSelector = By.cssSelector("[data-testid='TODO']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(consumptionSelector));
        String consumptionText = driver.findElement(consumptionSelector).getText();
        Assert.assertEquals(consumptionText, "6.0", "Vehicle profile consumption set to 6.0 L/100km");

        // Step 3: System attempts to calculate average consumption over last 100 km but only 50 km data available
        By dataAvailableSelector = By.cssSelector("[data-testid='TODO']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(dataAvailableSelector));
        String dataAvailableText = driver.findElement(dataAvailableSelector).getText();
        Assert.assertEquals(dataAvailableText, "50 km", "System uses available 50 km data for calculation");

        // Step 4: System calculates estimated driving range
        By rangeSelector = By.cssSelector("[data-testid='TODO']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(rangeSelector));
        String rangeText = driver.findElement(rangeSelector).getText();
        Assert.assertEquals(rangeText, "333 km", "Estimated range calculated as 333.33 km");

        // Step 5: System displays estimated driving range
        // Already verified in Step 4

        // Step 6: System checks low-fuel warning threshold
        By warningSelector = By.cssSelector("[data-testid='TODO']");
        boolean warningDisplayed = driver.findElements(warningSelector).size() > 0 &&
                driver.findElement(warningSelector).isDisplayed();
        Assert.assertFalse(warningDisplayed, "No warning triggered because range > 80 km");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}