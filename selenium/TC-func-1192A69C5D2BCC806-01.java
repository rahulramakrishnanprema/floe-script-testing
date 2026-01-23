import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-1192A69C5D2BCC806-01_Test {

    @Test
    public void test_TC-func-1192A69C5D2BCC806-01() {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("http://example.com/voltage-input");
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            // Step 1: Send a raw voltage of 3.0 volts to the system
            WebElement voltageInput = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']"))
            );
            voltageInput.clear();
            voltageInput.sendKeys("3.0");

            WebElement submitButton = driver.findElement(By.cssSelector("[data-testid='TODO']"));
            submitButton.click();

            // Step 2 & 3: Wait for and validate JSON response
            WebElement responseElement = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='TODO']"))
            );
            String responseText = responseElement.getText();

            Assert.assertTrue(responseText.contains("\"fuelQuantityLiters\":38.4"),
                "Expected fuelQuantityLiters to be 38.4");
            Assert.assertTrue(responseText.contains("\"status\":\"ACCEPTED\""),
                "Expected status to be ACCEPTED");
        } finally {
            driver.quit();
        }
    }
}