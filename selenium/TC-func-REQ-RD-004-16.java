import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
import java.util.List;

public class TC-func-REQ-RD-004-16_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://example.com/vehicle");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-RD-004-16() {
        // Capture buffer state before driving
        List<WebElement> bufferBefore = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(
                By.cssSelector("[data-testid='buffer-entry']")));
        Assert.assertEquals(bufferBefore.size(), 100, "Buffer should contain 100 elements before driving");
        String oldestBefore1 = bufferBefore.get(0).getText();
        String oldestBefore2 = bufferBefore.get(1).getText();

        // Step 1: Drive vehicle for 200 km to add two new consumption data points
        WebElement driveButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.cssSelector("[data-testid='drive-200km']")));
        driveButton.click();

        // Wait for buffer to update
        wait.until(ExpectedConditions.textToBePresentInElementLocated(
                By.cssSelector("[data-testid='buffer-size']"), "100"));

        // Step 2: Verify that the oldest two data points are overwritten by the new points
        List<WebElement> bufferAfter = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(
                By.cssSelector("[data-testid='buffer-entry']")));
        Assert.assertEquals(bufferAfter.size(), 100, "Buffer should still contain 100 elements after driving");
        String oldestAfter1 = bufferAfter.get(0).getText();
        String oldestAfter2 = bufferAfter.get(1).getText();
        Assert.assertNotEquals(oldestAfter1, oldestBefore1, "Oldest data point should be overwritten");
        Assert.assertNotEquals(oldestAfter2, oldestBefore2, "Second oldest data point should be overwritten");

        // Step 3: Check that the buffer index has wrapped around to the beginning
        WebElement indexElement = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.cssSelector("[data-testid='buffer-index']")));
        String indexText = indexElement.getText();
        Assert.assertEquals(indexText, "0", "Buffer index should wrap around to zero after reaching 100");
    }
}