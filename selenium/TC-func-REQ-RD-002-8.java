import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-RD-002-8_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://vehicle-ecu-test-page"); // Replace with actual URL
    }

    @Test
    public void test_TC-func-REQ-RD-002-8() {
        // Step 1: Set sensor voltage to 0.5V
        WebElement voltageInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        voltageInput.clear();
        voltageInput.sendKeys("0.5");
        WebElement applyButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        applyButton.click();

        WebElement fuelQty = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        String qtyText = fuelQty.getText();
        Assert.assertEquals(qtyText.trim(), "0 liters", "Fuel quantity should be 0 liters at 0.5V");

        // Step 2: Set sensor voltage to 4.5V
        voltageInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        voltageInput.clear();
        voltageInput.sendKeys("4.5");
        applyButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        applyButton.click();

        fuelQty = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        qtyText = fuelQty.getText();
        Assert.assertEquals(qtyText.trim(), "60 liters", "Fuel quantity should be 60 liters at 4.5V");

        // Step 3: Set sensor voltage to 2.5V
        voltageInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        voltageInput.clear();
        voltageInput.sendKeys("2.5");
        applyButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        applyButton.click();

        fuelQty = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        qtyText = fuelQty.getText();
        Assert.assertEquals(qtyText.trim(), "30 liters", "Fuel quantity should be 30 liters at 2.5V");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}