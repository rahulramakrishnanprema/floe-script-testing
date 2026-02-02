import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-REQ-003-7_Test {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://example.com"); // Replace with actual URL
    }

    @Test
    public void test_TC-func-REQ-003-7() {
        // Step 1: Set temperature to lower limit -10C
        WebElement tempInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        tempInput.clear();
        tempInput.sendKeys("-10");
        WebElement setButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        setButton.click();
        WebElement display = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        String displayedTemp = display.getText();
        Assert.assertEquals(displayedTemp, "-10°C", "System did not display correct temperature after setting lower limit");

        // Step 2: Set temperature to upper limit 50C
        tempInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        tempInput.clear();
        tempInput.sendKeys("50");
        setButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='TODO']")));
        setButton.click();
        display = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']")));
        displayedTemp = display.getText();
        Assert.assertEquals(displayedTemp, "50°C", "System did not display correct temperature after setting upper limit");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}