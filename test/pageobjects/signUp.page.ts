import { verify } from "node:crypto";
import {
	waitAndClick,
	waitAndInput,
	waitForElementToDisappear,
	waitForElementToAppear,
	hideKeyboard,
} from "../helperFunctions/helperFunctions";

class SignUpPage {
	private otpField(index: number) {
		return $(
			`android=new UiSelector().className("android.widget.EditText").instance(${index})`,
		);
	}
	private locators = {
		chooseYourRoleHeading:
			'//android.widget.TextView[@text="Choose Your Role"]',
		senderRoleButton:
			'//android.widget.TextView[@text="Send packages to any destination."]',
		courierRoleButton:
			'//android.widget.TextView[@text="Earn by delivering packages along your route."]',
		senderFormHeading: '//android.widget.TextView[@text="Sign Up as a Sender"]',
		firstNameInputField: '//android.widget.EditText[@text="Enter First Name"]',
		lastNameInputField: '//android.widget.EditText[@text="Enter Last Name"]',
		phoneNumberInputField:
			'//android.widget.EditText[@text="Enter Phone Number"]',
		emailInputField: '//android.widget.EditText[@text="Enter  Address"]',
		passwordInputField: '//android.widget.EditText[@text="Password"]',
		modeOfIdentificationDropdown:
			'//android.widget.TextView[@text="Select Your Mode of Identification "]',
		NINOption: '//android.widget.TextView[@text="NIN"]',
		BVNOption: '//android.widget.TextView[@text="BVN"]',
		NINInputField: '//android.widget.EditText[@text="Enter NIN"]',
		BVNInputField: '//android.widget.EditText[@text="Enter BVN"]',
		signUpButton: '//android.view.ViewGroup[@content-desc="Sign Up"]',

		// OTP
		otpInputField: '//android.widget.EditText[@text="Enter OTP"]',
		otpVerificationHeading:
			'//android.widget.TextView[@text="OTP Verification"]',
		resendOTPButton: '//android.widget.TextView[@text="Resend"]',
		verifyOTPButton: '//android.view.ViewGroup[@content-desc="Verify"]',
	};

	async waitForChooseYourRoleScreen(): Promise<void> {
		await waitForElementToAppear(
			$(this.locators.chooseYourRoleHeading),
			"Choose Your Role heading",
		);
	}

	async selectRole(role: "sender" | "courier"): Promise<void> {
		const roleButton =
			role === "sender"
				? $(this.locators.senderRoleButton)
				: $(this.locators.courierRoleButton);

		await waitAndClick(roleButton, `${role} role button`);
	}

	async waitForSenderOnboardingScreen(): Promise<void> {
		await waitForElementToAppear(
			$(this.locators.senderFormHeading),
			"Sender onboarding heading",
		);
	}

	async inputFirstName(firstName: string): Promise<void> {
		await waitAndInput(
			$(this.locators.firstNameInputField),
			firstName,
			"First Name input field",
		);
	}

	async inputLastName(lastName: string): Promise<void> {
		await waitAndInput(
			$(this.locators.lastNameInputField),
			lastName,
			"Last Name input field",
		);
	}

	async inputPhoneNumber(phoneNumber: string): Promise<void> {
		await waitAndInput(
			$(this.locators.phoneNumberInputField),
			phoneNumber,
			"Phone Number input field",
		);
	}

	async selectModeOfIdentification(mode: "NIN" | "BVN"): Promise<void> {
		await waitAndClick(
			$(this.locators.modeOfIdentificationDropdown),
			"Mode of Identification dropdown",
		);

		const option =
			mode === "NIN" ? $(this.locators.NINOption) : $(this.locators.BVNOption);

		await waitAndClick(option, `${mode} option`);
	}

	async inputNIN(nin: string): Promise<void> {
		await waitAndInput($(this.locators.NINInputField), nin, "NIN input field");
	}

	async inputBVN(bvn: string): Promise<void> {
		await waitAndInput($(this.locators.BVNInputField), bvn, "BVN input field");
	}

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

	async clickSignUpButton(): Promise<void> {
		await waitAndClick($(this.locators.signUpButton), "Sign Up button");
	}

	async waitForOTPVerificationScreen(): Promise<void> {
		await waitForElementToAppear(
			$(this.locators.otpVerificationHeading),
			"OTP Verification heading",
		);
	}

	async inputOTP(otp: string): Promise<void> {
		if (otp.length !== 6) {
			throw new Error(`OTP must be 6 digits, received ${otp.length}`);
		}

		const digits = otp.split("");

		for (let i = 0; i < digits.length; i++) {
			const field = await this.otpField(i);
			await field.waitForDisplayed({ timeout: 10000 });
			await field.setValue(digits[i]);
		}
	}

	async clickResendOTPButton(): Promise<void> {
		await waitAndClick($(this.locators.resendOTPButton), "Resend OTP button");
	}

	async clickVerifyOTPButton(): Promise<void> {
		await waitAndClick($(this.locators.verifyOTPButton), "Verify OTP button");
	}
}

export default new SignUpPage();
