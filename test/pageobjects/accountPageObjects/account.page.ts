import {
	waitAndClick,
	// waitAndInput,
	// waitForElementToDisappear,
	// waitForElementToAppear,
} from "../../helperFunctions/helperFunctions";

class accountPage {
	private locators = {
		personalInfoButton:
			'//android.view.ViewGroup[@content-desc="Personal Info"]',
		vehicleInfoButton: '//android.view.ViewGroup[@content-desc="Vehicle Info"]',
		settingsButton: '//android.view.ViewGroup[@content-desc="Settings"]',
		supportButton: '//android.view.ViewGroup[@content-desc="Support"]',
		logoutButton: '//android.view.ViewGroup[@content-desc="Logout"]',
		switchAccountButton:
			'//android.view.ViewGroup[@content-desc="Switch Account"]',
	};

	async clickPersonalInfoButton(): Promise<void> {
		await waitAndClick(
			await $(this.locators.personalInfoButton),
			"Personal Info button",
		);
	}

	async clickVehicleInfoButton(): Promise<void> {
		await waitAndClick(
			await $(this.locators.vehicleInfoButton),
			"Vehicle Info button",
		);
	}

	async clickSettingsButton(): Promise<void> {
		await waitAndClick(
			await $(this.locators.settingsButton),
			"Settings button",
		);
	}

	async clickSupportButton(): Promise<void> {
		await waitAndClick(await $(this.locators.supportButton), "Support button");
	}

	async clickLogoutButton(): Promise<void> {
		await waitAndClick(await $(this.locators.logoutButton), "Logout button");
	}

	async clickSwitchAccountButton(): Promise<void> {
		await waitAndClick(
			await $(this.locators.switchAccountButton),
			"Switch Account button",
		);
	}
}

export default new accountPage();
