import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class TC-func-REQ-RD-004-15_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void test_TC-func-REQ-RD-004-15() {
        // Step 1: Start vehicle and allow ECU to initialize
        driver.get("http://vehicle-ecu-web-interface"); // placeholder URL

        // Wait for ECU initialization indicator
        WebElement initIndicator = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='ecu-initialized']")));
        Assert.assertTrue(initIndicator.isDisplayed(), "ECU should be initialized");

        // Step 2: Query current consumption profile from ECU
        WebElement queryButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='query-consumption-profile']")));
        queryButton.click();

        // Wait for response
        WebElement profileValue = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='consumption-profile-value']")));
        String profileText = profileValue.getText().trim();

        // Validate baseline profile
        Assert.assertEquals(profileText, "7.5 L/100km", "Baseline consumption profile should be 7.5 L/100km");

        // Postconditions: baseline profile remains stored, no learned profile created
        // Verify no learned profile indicator
        WebElement learnedProfileIndicator = driver.findElement(By.cssSelector("[data-testid='learned-profile']"));
        Assert.assertFalse(learnedProfileIndicator.isDisplayed(), "No learned profile should exist");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}