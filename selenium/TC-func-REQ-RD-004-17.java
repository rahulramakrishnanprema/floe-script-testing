import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class TC-func-REQ-RD-004-17_Test {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(60));
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void test_TC-func-REQ-RD-004-17() {
        // Navigate to ECU dashboard
        driver.get("http://localhost:8080/ecu-dashboard");

        // Step 1: Start highway driving simulation
        WebElement startDriveButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='start-drive']")));
        startDriveButton.click();

        // Simulate driving 500 km - placeholder wait for distance element
        wait.until(driver1 -> {
            WebElement distanceElement = driver1.findElement(By.cssSelector("[data-testid='distance-traveled']"));
            String distanceText = distanceElement.getText(); // e.g., "500 km"
            return distanceText.contains("500");
        });

        // Verify ECU records new consumption data
        WebElement consumptionElement = driver.findElement(By.cssSelector("[data-testid='consumption-data']"));
        Assert.assertTrue(consumptionElement.isDisplayed(), "ECU should display consumption data after driving");

        // Step 2: Allow learning algorithm to process data
        WebElement processButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='process-data']")));
        processButton.click();

        // Wait for profile update
        wait.until(driver1 -> {
            WebElement profileElement = driver1.findElement(By.cssSelector("[data-testid='consumption-profile']"));
            String profileText = profileElement.getText(); // e.g., "Highway: 8.5 L/100km"
            return profileText.contains("Highway");
        });

        // Step 3: Query updated consumption profile
        WebElement profileElement = driver.findElement(By.cssSelector("[data-testid='consumption-profile']"));
        String profileText = profileElement.getText();
        Assert.assertTrue(profileText.contains("Highway"), "Profile should reflect highway consumption values");

        // Additional validation: lower consumption per 100 km compared to city profile
        WebElement cityProfileElement = driver.findElement(By.cssSelector("[data-testid='city-consumption-profile']"));
        String cityProfileText = cityProfileElement.getText(); // e.g., "City: 10.0 L/100km"

        double highwayConsumption = extractConsumption(profileText);
        double cityConsumption = extractConsumption(cityProfileText);
        Assert.assertTrue(highwayConsumption < cityConsumption, "Highway consumption should be lower than city consumption");
    }

    private double extractConsumption(String text) {
        // Example: "Highway: 8.5 L/100km"
        String[] parts = text.split(":");
        if (parts.length < 2) return Double.MAX_VALUE;
        String valuePart = parts[1].trim().split(" ")[0];
        try {
            return Double.parseDouble(valuePart);
        } catch (NumberFormatException e) {
            return Double.MAX_VALUE;
        }
    }
}