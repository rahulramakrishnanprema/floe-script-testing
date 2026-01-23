import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-1192A69C5D2BCC91D-05_Test {

    @Test
    public void test_TC-func-1192A69C5D2BCC91D-05() {
        WebDriver driver = new ChromeDriver();
        try {
            // Navigate to the system interface page
            driver.get("http://example.com"); // Replace with actual URL

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            // Step 1: Send a raw voltage corresponding to 41.0 liters
            WebElement voltageInput = wait.until(ExpectedConditions.visibilityOfElementLocated(
                    By.cssSelector("[data-testid='TODO']")));
            voltageInput.clear();
            voltageInput.sendKeys("41.0");

            WebElement sendButton = wait.until(ExpectedConditions.elementToBeClickable(
                    By.cssSelector("[data-testid='TODO']")));
            sendButton.click();

            // Verify that system calculates new fuel quantity as 41.0 liters
            WebElement fuelQuantityDisplay = wait.until(ExpectedConditions.visibilityOfElementLocated(
                    By.cssSelector("[data-testid='TODO']")));
            String displayedQuantity = fuelQuantityDisplay.getText();
            Assert.assertEquals(displayedQuantity, "41.0", "Fuel quantity should be 41.0 liters");

            // Step 2: System compares difference of 2.6 liters to threshold and rejects the spike
            WebElement statusElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                    By.cssSelector("[data-testid='TODO']")));
            String statusText = statusElement.getText();
            Assert.assertEquals(statusText, "REJECTED", "Spike should be rejected");

            // Step 3: System returns JSON response containing status REJECTED
            WebElement jsonResponseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                    By.cssSelector("[data-testid='TODO']")));
            String jsonResponse = jsonResponseElement.getText();
            Assert.assertTrue(jsonResponse.contains("\"status\":\"REJECTED\""),
                    "JSON response should contain status REJECTED");

        } finally {
            driver.quit();
        }
    }
}