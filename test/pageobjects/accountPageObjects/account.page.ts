import {
    waitAndClick,
    waitForElementToAppear,
} from "../../helperFunctions/helperFunctions";

class accountPage {
    private locators = {
        personalInfoButton: "~Personal Info",
        vehicleInfoButton: "~Vehicle Info",
        settingsButton: "~Settings",
        supportButton: "~Support",
        logoutButton: "~Logout",
        deleteAccountButton: "~Delete Account",
        switchAccountButton: "~Switch Account",
    };

    private accountSwitchingLocators = {
        tryingToSwitchModalHeading:
            'android=new UiSelector().text("Trying to switch account?")',
        tryingToSwitchToCourierProfileModalMessage:
            'android=new UiSelector().text("You dont have a COURIER profile on your account")',
        tryingToSwitchToSenderProfileModalMessage:
            'android=new UiSelector().text("You dont have a SENDER profile on your account")',
        yesButtonOnTryingToSwitchModal: "~Yes",
        noButtonOnTryingToSwitchModal: "~No",
    };

    async clickPersonalInfoButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.personalInfoButton),
            "Personal Info button",
        );
    }

    async clickVehicleInfoButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.vehicleInfoButton),
            "Vehicle Info button",
        );
    }

    async clickSettingsButton(): Promise<void> {
        await waitAndClick($(this.locators.settingsButton), "Settings button");
    }

    async clickSupportButton(): Promise<void> {
        await waitAndClick($(this.locators.supportButton), "Support button");
    }

    async clickLogoutButton(): Promise<void> {
        await waitAndClick($(this.locators.logoutButton), "Logout button");
    }

    async clickDeleteAccountButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.deleteAccountButton),
            "Delete Account button",
        );
    }

    // account switching actions
    async clickSwitchAccountButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.switchAccountButton),
            "Switch Account button",
        );
    }

    async waitForTryingToSwitchModalToAppear(
        role: "Sender" | "Courier",
    ): Promise<void> {
        await waitForElementToAppear(
            $(this.accountSwitchingLocators.tryingToSwitchModalHeading),
            "Trying to switch modal heading",
        );
        if (role === "Sender") {
            await waitForElementToAppear(
                $(
                    this.accountSwitchingLocators
                        .tryingToSwitchToSenderProfileModalMessage,
                ),
                "Trying to switch to sender profile modal message",
            );
        } else if (role === "Courier") {
            await waitForElementToAppear(
                $(
                    this.accountSwitchingLocators
                        .tryingToSwitchToCourierProfileModalMessage,
                ),
                "Trying to switch to courier profile modal message",
            );
        }
    }

    private async tryWaitForTryingToSwitchModalToAppear(
        role: "Sender" | "Courier",
    ): Promise<boolean> {
        try {
            await this.waitForTryingToSwitchModalToAppear(role);
            return true;
        } catch {
            return false;
        }
    }

    async confirmSwitchingAccount(): Promise<void> {
        await waitAndClick(
            $(this.accountSwitchingLocators.yesButtonOnTryingToSwitchModal),
            "Yes button on trying to switch modal",
        );
    }

    async cancelSwitchingAccount(): Promise<void> {
        await waitAndClick(
            $(this.accountSwitchingLocators.noButtonOnTryingToSwitchModal),
            "No button on trying to switch modal",
        );
    }

    async checkTryingToSwitchModal(role: "Sender" | "Courier"): Promise<void> {
        const modalAppeared =
            await this.tryWaitForTryingToSwitchModalToAppear(role);

        if (modalAppeared) {
            await this.confirmSwitchingAccount();
        }
    }

    async startAccountSwitchingFlow(role: "Sender" | "Courier"): Promise<void> {
        await this.clickSwitchAccountButton();
        await this.checkTryingToSwitchModal(role);
    }
}

export default new accountPage();
