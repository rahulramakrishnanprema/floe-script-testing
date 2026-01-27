import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;

public class TC-func-REQ-RD-003-13_Test {

    @Test
    public void test_TC-func-REQ-RD-003-13() {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        try {
            // Navigate to the vehicle dashboard page
            driver.get("http://vehicle-dashboard.test");

            // Helper method to set fuel level sensor
            java.util.function.BiConsumer<Integer, Boolean> setFuelLevel = (level, shouldBeActive) -> {
                // Locate the fuel level input field
                WebElement fuelInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='fuel-level-input']")));
                fuelInput.clear();
                fuelInput.sendKeys(String.valueOf(level));

                // Click the apply button
                WebElement applyButton = driver.findElement(By.cssSelector("[data-testid='apply-fuel-level']"));
                applyButton.click();

                // Wait for the warning status to stabilize
                By warningSelector = By.cssSelector("[data-testid='low-fuel-warning']");
                if (shouldBeActive) {
                    wait.until(ExpectedConditions.visibilityOfElementLocated(warningSelector));
                    Assert.assertTrue(driver.findElement(warningSelector).isDisplayed(), "Low fuel warning should be active at " + level + " km");
                } else {
                    wait.until(ExpectedConditions.invisibilityOfElementLocated(warningSelector));
                    Assert.assertFalse(driver.findElement(warningSelector).isDisplayed(), "Low fuel warning should be inactive at " + level + " km");
                }
            };

            // Step 1: Set fuel level sensor to 81 km, warning remains inactive
            setFuelLevel.accept(81, false);

            // Step 2: Set fuel level sensor to 79 km, warning activates
            setFuelLevel.accept(79, true);

            // Step 3: Set fuel level sensor to 81 km, warning remains active
            setFuelLevel.accept(81, true);

            // Step 4: Set fuel level sensor to 119 km, warning remains active
            setFuelLevel.accept(119, true);

            // Step 5: Set fuel level sensor to 121 km, warning deactivates
            setFuelLevel.accept(121, false);

            // Postcondition: Low fuel warning is inactive after final step
            By warningSelector = By.cssSelector("[data-testid='low-fuel-warning']");
            wait.until(ExpectedConditions.invisibilityOfElementLocated(warningSelector));
            Assert.assertFalse(driver.findElement(warningSelector).isDisplayed(), "Low fuel warning should be inactive after final step");
        } finally {
            driver.quit();
        }
    }
}