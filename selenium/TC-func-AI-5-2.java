import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-AI-5-2_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void test_TC-func-AI-5-2() {
        // Precondition: User logged in as client non advisor
        driver.get("https://example.com/login");
        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("username")));
        usernameField.sendKeys("clientUser");
        WebElement passwordField = driver.findElement(By.id("password"));
        passwordField.sendKeys("clientPassword");
        WebElement loginButton = driver.findElement(By.id("loginBtn"));
        loginButton.click();

        // Verify client can access client portfolio page
        wait.until(ExpectedConditions.urlContains("/portfolio"));

        // Step 1: Attempt to navigate to the dashboard URL
        driver.get("https://example.com/dashboard");
        WebElement accessDeniedMsg = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='access-denied']")));
        Assert.assertTrue(accessDeniedMsg.isDisplayed(), "Access denied message should be displayed for non-advisor user.");

        // Step 2: Log in as an advisor user
        driver.get("https://example.com/login");
        WebElement advisorUsername = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("username")));
        advisorUsername.clear();
        advisorUsername.sendKeys("advisorUser");
        WebElement advisorPassword = driver.findElement(By.id("password"));
        advisorPassword.clear();
        advisorPassword.sendKeys("advisorPassword");
        WebElement advisorLoginBtn = driver.findElement(By.id("loginBtn"));
        advisorLoginBtn.click();

        // Verify advisor can access dashboard
        driver.get("https://example.com/dashboard");
        WebElement chartContainer = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='chart-container']")));
        Assert.assertTrue(chartContainer.isDisplayed(), "Advisor should see the visual analytics chart.");

        // Step 3: Verify that the advisor sees the visual analytics for the portfolio
        WebElement chart = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='chart']")));
        Assert.assertTrue(chart.isDisplayed(), "Chart should be displayed correctly.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}