import { expect } from "@wdio/globals";
import "";

describe("RouTag - Login", () => {
	it("should login successfully with valid credentials", async () => {
		// Find elements
		const usernameField = await $(
			'//android.widget.EditText[@text="Username or Email"]',
		);
		const passwordField = await $(
			'//android.widget.EditText[@text="Password"]',
		);
		const loginButton = await $(
			'//android.view.ViewGroup[@content-desc="Login"]',
		);

		// Enter credentials
		await usernameField.click();
		await usernameField.setValue("your_test_email@example.com");

		await passwordField.click();
		await passwordField.setValue("your_test_password");

		// Tap login
		await loginButton.click();

		// Wait for home screen to load after login
		await driver.pause(3000);

		// Assert we are no longer on the login screen
		const loginStillVisible = await $(
			'//android.view.ViewGroup[@content-desc="Login"]',
		).isDisplayed();
		await expect(loginStillVisible).toBe(false);
	});
});
