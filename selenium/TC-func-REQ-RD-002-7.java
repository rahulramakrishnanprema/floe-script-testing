import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-RD-002-7_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://example.com"); // Replace with actual URL
        // Precondition: Vehicle ignition ON, Last valid reading is 20 liters
        // Assume the page is already in the correct state
    }

    @Test
    public void test_TC-func-REQ-RD-002-7() {
        // Step 1: Provide reading of 23 liters
        WebElement readingInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='reading-input']")));
        readingInput.clear();
        readingInput.sendKeys("23");

        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='submit-reading']")));
        submitButton.click();

        // Expected: Reading is rejected and previous valid remains 20 liters
        WebElement errorMsg = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='error-message']")));
        Assert.assertTrue(errorMsg.getText().toLowerCase().contains("rejected"), "Error message should indicate rejection");

        WebElement lastValidDisplay = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='last-valid-reading']")));
        Assert.assertEquals(lastValidDisplay.getText(), "20", "Last valid reading should remain 20 liters");

        // Step 2: Provide reading of 21 liters
        readingInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='reading-input']")));
        readingInput.clear();
        readingInput.sendKeys("21");

        submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='submit-reading']")));
        submitButton.click();

        // Expected: Reading is accepted and updated to 21 liters
        WebElement successMsg = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='success-message']")));
        Assert.assertTrue(successMsg.getText().toLowerCase().contains("accepted"), "Success message should indicate acceptance");

        lastValidDisplay = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='last-valid-reading']")));
        Assert.assertEquals(lastValidDisplay.getText(), "21", "Last valid reading should be updated to 21 liters");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}