import {
    waitAndClick,
    waitAndInput,
    waitForElementToDisappear,
    waitForElementToAppear,
    hideKeyboard,
} from "../helperFunctions/helperFunctions";

class LoginPage {
    private locators = {
        emailInputField: '//android.widget.EditText[@text="Email"]',
        passwordInputField: '//android.widget.EditText[@text="Password"]',
        loginButton: '//android.view.ViewGroup[@content-desc="Login"]',
        forgotPasswordLink:
            '//android.widget.TextView[@text="Forgot Password"]',
        signUpButton: '//android.widget.TextView[@text="Sign up"]',
        sendPackageButton:
            '//android.view.ViewGroup[@content-desc="Send Package"]',
        searchForDeliveriesButton:
            '//android.view.ViewGroup[@content-desc="Search for Deliveries"]',
        invalidCredentialsToast:
            '//android.widget.TextView[@text="Invalid Login Credentials"]',
    };

    async inputEmail(email: string): Promise<void> {
        await waitAndInput(
            $(this.locators.emailInputField),
            email,
            "Email input field",
        );
    }

    async inputPassword(password: string): Promise<void> {
        await waitAndInput(
            $(this.locators.passwordInputField),
            password,
            "Password input field",
        );
    }

    async clickLoginButton(): Promise<void> {
        await waitAndClick($(this.locators.loginButton), "Login button");
    }

    async waitForLoginToComplete(
        userType: "sender" | "courier",
    ): Promise<void> {
        await waitForElementToDisappear(
            $(this.locators.loginButton),
            "Login button",
        );

        if (userType === "sender") {
            await waitForElementToAppear(
                $(this.locators.sendPackageButton),
                "Send Package button",
            );
        } else {
            await waitForElementToAppear(
                $(this.locators.searchForDeliveriesButton),
                "Search for Deliveries button",
            );
        }
    }

    async verifyInvalidCredentialsToast(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.invalidCredentialsToast),
            "Invalid credentials toast",
        );
    }

    async clickSignUpButton(): Promise<void> {
        await waitAndClick($(this.locators.signUpButton), "Sign Up button");
    }

    async loginUser(email: string, password: string): Promise<void> {
        await this.inputEmail(email);
        await hideKeyboard();
        await this.inputPassword(password);
        await hideKeyboard();
        await this.clickLoginButton();
    }
}

export default new LoginPage();
