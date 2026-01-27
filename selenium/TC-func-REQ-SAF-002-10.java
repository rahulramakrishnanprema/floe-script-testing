import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-REQ-SAF-002-10_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://example.com");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-SAF-002-10() throws InterruptedException {
        long startTime = System.currentTimeMillis();

        // Step 1: Reduce fuel level to 79 km
        WebElement fuelInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='fuel-level-input']")));
        fuelInput.clear();
        fuelInput.sendKeys("79");
        WebElement fuelDisplay = wait.until(ExpectedConditions.textToBePresentInElementLocated(By.cssSelector("[data-testid='fuel-level-display']"), "79 km"));
        Assert.assertTrue(fuelDisplay.isDisplayed(), "Fuel level display is not visible");

        // Simulate sensor acquisition delay
        Thread.sleep(100);

        // Step 3: Data filtering delay
        Thread.sleep(200);

        // Step 4: Threshold comparison delay
        Thread.sleep(100);

        // Step 5: Activate low fuel warning icon
        Thread.sleep(1600);
        WebElement warningIcon = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='low-fuel-warning']")));
        Assert.assertTrue(warningIcon.isDisplayed(), "Low fuel warning icon is not displayed");

        long endTime = System.currentTimeMillis();
        long latency = endTime - startTime;
        Assert.assertEquals(latency, 2000, "Total latency is not exactly 2.0 seconds");
    }
}