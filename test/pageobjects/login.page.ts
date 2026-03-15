import {
	waitAndClick,
	waitAndInput,
	waitForElementToDisappear,
	waitForElementToAppear,
	hideKeyboard,
} from "../helperFunctions/helperFunctions";

class LoginPage {
	private locators = {
		emailInputField: '//android.widget.EditText[@text="Username or Email"]',
		passwordInputField: '//android.widget.EditText[@text="Password"]',
		loginButton: '//android.view.ViewGroup[@content-desc="Login"]',
		forgotPasswordLink:
			'//android.view.ViewGroup[@content-desc="Forgot Password"]',
		sendPackageButton: '//android.view.ViewGroup[@content-desc="Send Package"]',
		searchForDeliveriesButton:
			'//android.view.ViewGroup[@content-desc="Search for Deliveries"]',
	};

	async inputEmail(email: string): Promise<void> {
		await waitAndInput(
			await $(this.locators.emailInputField),
			email,
			"Email input field",
		);
	}

	async inputPassword(password: string): Promise<void> {
		await waitAndInput(
			await $(this.locators.passwordInputField),
			password,
			"Password input field",
		);
	}

	async clickLoginButton(): Promise<void> {
		await waitAndClick(await $(this.locators.loginButton), "Login button");
	}

	async waitForLoginToComplete(userType: "sender" | "courier"): Promise<void> {
		await waitForElementToDisappear(
			await $(this.locators.loginButton),
			"Login button",
		);

		if (userType === "sender") {
			await waitForElementToAppear(
				await $(this.locators.sendPackageButton),
				"Send Package button",
			);
		} else {
			await waitForElementToAppear(
				await $(this.locators.searchForDeliveriesButton),
				"Search for Deliveries button",
			);
		}
	}

	async loginUser(
		email: string,
		password: string,
		userType: "sender" | "courier",
	): Promise<void> {
		await this.inputEmail(email);
		await hideKeyboard();
		await this.inputPassword(password);
		await hideKeyboard();
		await this.clickLoginButton();
		await this.waitForLoginToComplete(userType);
	}
}

export default new LoginPage();
