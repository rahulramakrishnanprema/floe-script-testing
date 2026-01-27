import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-SAF-004-21_Test {

    @Test
    public void test_TC-func-REQ-SAF-004-21() {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        try {
            // Precondition: Vehicle system powered on and in normal operation, Fuel sensor connected and providing valid voltage 4.0V, Vehicle speed set to 25 km/h
            driver.get("http://example.com"); // Placeholder URL

            // Step 1: Set sensor voltage to 4.7V to trigger open circuit fault
            By sensorVoltageInput = By.cssSelector("[data-testid='TODO']");
            WebElement voltageInput = wait.until(ExpectedConditions.visibilityOfElementLocated(sensorVoltageInput));
            voltageInput.clear();
            voltageInput.sendKeys("4.7");
            By submitButton = By.cssSelector("[data-testid='TODO']");
            WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(submitButton));
            submitBtn.click();

            // Step 2: Verify fault code stored and warning active
            By faultCodeElement = By.cssSelector("[data-testid='TODO']");
            wait.until(ExpectedConditions.textToBePresentInElementLocated(faultCodeElement, "FAULT_CODE"));
            Assert.assertTrue(driver.findElement(faultCodeElement).isDisplayed(), "Fault code should be displayed");
            By warningElement = By.cssSelector("[data-testid='TODO']");
            wait.until(ExpectedConditions.visibilityOfElementLocated(warningElement));
            Assert.assertTrue(driver.findElement(warningElement).isDisplayed(), "Warning should be active");

            // Step 3: Set sensor voltage back to 4.0V and wait 6 seconds before providing 3 consecutive valid readings
            voltageInput.clear();
            voltageInput.sendKeys("4.0");
            submitBtn.click();
            Thread.sleep(6000); // Wait 6 seconds
            By validReadingButton = By.cssSelector("[data-testid='TODO']");
            WebElement readingBtn = wait.until(ExpectedConditions.elementToBeClickable(validReadingButton));
            for (int i = 0; i < 3; i++) {
                readingBtn.click();
                Thread.sleep(1000); // Wait 1 second between readings
            }

            // Step 4: Verify fault code remains active
            wait.until(ExpectedConditions.textToBePresentInElementLocated(faultCodeElement, "FAULT_CODE"));
            Assert.assertTrue(driver.findElement(faultCodeElement).isDisplayed(), "Fault code should still be active");

            // Step 5: Verify low-fuel warning still active
            By lowFuelWarning = By.cssSelector("[data-testid='TODO']");
            wait.until(ExpectedConditions.visibilityOfElementLocated(lowFuelWarning));
            Assert.assertTrue(driver.findElement(lowFuelWarning).isDisplayed(), "Low-fuel warning should remain active");

            // Step 6: Verify diagnostic message still displayed
            By diagnosticMessage = By.cssSelector("[data-testid='TODO']");
            wait.until(ExpectedConditions.visibilityOfElementLocated(diagnosticMessage));
            Assert.assertTrue(driver.findElement(diagnosticMessage).isDisplayed(), "Diagnostic message should still be displayed");

        } catch (Exception e) {
            e.printStackTrace();
            Assert.fail("Test failed due to exception: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }
}