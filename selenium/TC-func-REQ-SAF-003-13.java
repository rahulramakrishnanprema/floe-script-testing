import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-REQ-SAF-003-13_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        // Set path to chromedriver executable
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        // Navigate to the vehicle dashboard page
        driver.get("http://vehicle-dashboard.example.com");
    }

    @Test
    public void test_TC-func-REQ-SAF-003-13() {
        // Step 1: Initiate vehicle shutdown
        By shutdownButton = By.cssSelector("[data-testid='shutdownButton']");
        wait.until(ExpectedConditions.elementToBeClickable(shutdownButton)).click();
        // Verify warning state persisted in non-volatile memory and logged in event history
        By eventHistory = By.cssSelector("[data-testid='eventHistory']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(eventHistory));
        String historyText = driver.findElement(eventHistory).getText();
        Assert.assertTrue(historyText.contains("Low fuel warning persisted"), "Event history does not contain persistence entry");

        // Step 2: Power off vehicle
        By powerOffButton = By.cssSelector("[data-testid='powerOffButton']");
        wait.until(ExpectedConditions.elementToBeClickable(powerOffButton)).click();
        // Verify vehicle remains off
        By vehicleStatus = By.cssSelector("[data-testid='vehicleStatus']");
        wait.until(ExpectedConditions.textToBe(vehicleStatus, "Off"));
        String statusText = driver.findElement(vehicleStatus).getText();
        Assert.assertEquals(statusText, "Off", "Vehicle did not power off correctly");

        // Step 3: Power on vehicle
        By powerOnButton = By.cssSelector("[data-testid='powerOnButton']");
        wait.until(ExpectedConditions.elementToBeClickable(powerOnButton)).click();
        // Verify low fuel warning reactivates automatically
        By lowFuelWarning = By.cssSelector("[data-testid='lowFuelWarning']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(lowFuelWarning));
        Assert.assertTrue(driver.findElement(lowFuelWarning).isDisplayed(), "Low fuel warning did not reactivate after power on");

        // Step 4: Increase fuel level to 121 km
        By fuelLevelInput = By.cssSelector("[data-testid='fuelLevelInput']");
        WebElement fuelInput = wait.until(ExpectedConditions.elementToBeClickable(fuelLevelInput));
        fuelInput.clear();
        fuelInput.sendKeys("121");
        // Assume there is a submit or update button
        By updateFuelButton = By.cssSelector("[data-testid='updateFuelButton']");
        wait.until(ExpectedConditions.elementToBeClickable(updateFuelButton)).click();
        // Verify low fuel warning clears
        wait.until(ExpectedConditions.invisibilityOfElementLocated(lowFuelWarning));
        Assert.assertFalse(driver.findElement(lowFuelWarning).isDisplayed(), "Low fuel warning did not clear after fuel level increase");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}