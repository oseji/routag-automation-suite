import {
    waitAndClick,
    // waitAndInput,
    // waitForElementToDisappear,
    // waitForElementToAppear,
} from "../helperFunctions/helperFunctions";

class appNavigationPage {
    private locators = {
        homeButton: '//android.view.View[@content-desc="Home"]',
        pickupButton: '//android.view.View[@content-desc="Pickup"]',
        deliveriesButton: '//android.view.View[@content-desc="Deliveries"]',
        walletButton: '//android.view.View[@content-desc="Wallet"]',
        accountButton: '//android.view.View[@content-desc="Account"]',
        // editLocationButton: '//android.widget.TextView[@text="Edit"]',
    };

    async navigateToHomeScreen(): Promise<void> {
        await waitAndClick(await $(this.locators.homeButton), "Home button");
    }

    async navigateToPickupScreen(): Promise<void> {
        await waitAndClick(
            await $(this.locators.pickupButton),
            "Pickup button",
        );
    }

    async navigateToDeliveriesScreen(): Promise<void> {
        await waitAndClick(
            await $(this.locators.deliveriesButton),
            "Deliveries button",
        );
    }

    async navigateToWalletScreen(): Promise<void> {
        await waitAndClick(
            await $(this.locators.walletButton),
            "Wallet button",
        );
    }

    async navigateToAccountScreen(): Promise<void> {
        await waitAndClick(
            await $(this.locators.accountButton),
            "Account button",
        );
    }

    // async editLocationButton(): Promise<void> {
    // 	await waitAndClick(
    // 		await $(this.locators.editLocationButton),
    // 		"Edit Location button",
    // 	);
    // }
}

export default new appNavigationPage();
