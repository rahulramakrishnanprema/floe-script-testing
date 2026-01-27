import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-SAF-001-2_Test {
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
    public void test_TC-func-REQ-SAF-001-2() {
        // Step 1: System reads fuel quantity 30 liters
        WebElement fuelInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='fuel-input']")));
        fuelInput.clear();
        fuelInput.sendKeys("30");
        WebElement fuelDisplay = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='fuel-display']")));
        Assert.assertEquals(fuelDisplay.getText(), "30 liters", "Fuel quantity recorded as 30 liters");

        // Step 2: System checks for vehicle profile and does not find one
        boolean profileAbsent = driver.findElements(By.cssSelector("[data-testid='vehicle-profile']")).isEmpty();
        Assert.assertTrue(profileAbsent, "Vehicle profile missing");

        // Step 3: System uses default consumption profile of 7.5 L/100km
        WebElement consumptionDisplay = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='consumption-profile']")));
        Assert.assertEquals(consumptionDisplay.getText(), "7.5 L/100km", "Default consumption set to 7.5 L/100km");

        // Step 4: System calculates estimated driving range
        WebElement rangeDisplay = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='estimated-range']")));
        Assert.assertEquals(rangeDisplay.getText(), "400 km", "Estimated range calculated as 400 km");

        // Step 5: System displays estimated driving range
        // Already verified in Step 4

        // Step 6: System checks low-fuel warning threshold
        boolean warningPresent = !driver.findElements(By.cssSelector("[data-testid='low-fuel-warning']")).isEmpty();
        Assert.assertFalse(warningPresent, "No warning triggered because range > 80 km");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}