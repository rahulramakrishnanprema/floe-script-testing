import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-RD-003-11_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://vehicle-ui.example.com");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-RD-003-11() {
        // Precondition: Vehicle is powered on, Low fuel warning is active, Fuel level sensor reports a driving range of 100 km
        By lowFuelWarning = By.cssSelector("[data-testid='low-fuel-warning']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(lowFuelWarning));
        Assert.assertTrue(driver.findElement(lowFuelWarning).isDisplayed(), "Low fuel warning should be active before power cycle");

        // Step 1: Power off vehicle
        By powerOffButton = By.cssSelector("[data-testid='power-off']");
        driver.findElement(powerOffButton).click();
        By vehicleShutdownIndicator = By.cssSelector("[data-testid='vehicle-shutdown']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(vehicleShutdownIndicator));
        Assert.assertTrue(driver.findElement(vehicleShutdownIndicator).isDisplayed(), "Vehicle should shut down after power off");

        // Step 2: Power on vehicle
        By powerOnButton = By.cssSelector("[data-testid='power-on']");
        driver.findElement(powerOnButton).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(lowFuelWarning));
        Assert.assertTrue(driver.findElement(lowFuelWarning).isDisplayed(), "Low fuel warning should re-activate after power on");

        // Postcondition: Low fuel warning is active after ignition
        // Already verified above
    }
}