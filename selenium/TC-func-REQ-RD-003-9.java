import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-RD-003-9_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://vehicle-dashboard-url");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-RD-003-9() {
        // Precondition: Vehicle powered on, low fuel warning inactive, sensor 81 km
        setFuelLevel(81);
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));

        // Step 1: Set to 80 km
        setFuelLevel(80);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        Assert.assertTrue(isLowFuelWarningVisible(), "Low fuel warning should activate at 80 km");

        // Step 2: Set to 79 km
        setFuelLevel(79);
        Assert.assertTrue(isLowFuelWarningVisible(), "Low fuel warning should remain active at 79 km");

        // Step 3: Set to 81 km
        setFuelLevel(81);
        Assert.assertTrue(isLowFuelWarningVisible(), "Low fuel warning should remain active at 81 km");

        // Postcondition: warning remains active
        Assert.assertTrue(isLowFuelWarningVisible(), "Low fuel warning remains active after test");
    }

    private void setFuelLevel(int km) {
        By fuelInput = By.cssSelector("[data-testid='TODO']");
        wait.until(ExpectedConditions.elementToBeClickable(fuelInput));
        WebElement input = driver.findElement(fuelInput);
        input.clear();
        input.sendKeys(String.valueOf(km));

        By applyButton = By.cssSelector("[data-testid='TODO']");
        wait.until(ExpectedConditions.elementToBeClickable(applyButton));
        driver.findElement(applyButton).click();

        wait.until(ExpectedConditions.textToBePresentInElementValue(fuelInput, String.valueOf(km)));
    }

    private boolean isLowFuelWarningVisible() {
        try {
            By warning = By.cssSelector("[data-testid='TODO']");
            wait.until(ExpectedConditions.visibilityOfElementLocated(warning));
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }
}