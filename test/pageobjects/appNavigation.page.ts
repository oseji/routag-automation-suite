import { waitAndClick } from "../helperFunctions/helperFunctions";

class appNavigationPage {
    private locators = {
        homeButton: "~Home",
        pickupButton: "~Pickup",
        deliveriesButton: "~Deliveries",
        walletButton: "~Wallet",
        accountButton: "~Account",
    };

    async navigateToHomeScreen(): Promise<void> {
        await waitAndClick(await $(this.locators.homeButton), "Home button");
    }

    async navigateToPickupScreen(): Promise<void> {
        await waitAndClick($(this.locators.pickupButton), "Pickup button");
    }

    async navigateToDeliveriesScreen(): Promise<void> {
        await waitAndClick(
            $(this.locators.deliveriesButton),
            "Deliveries button",
        );
    }

    async navigateToWalletScreen(): Promise<void> {
        await waitAndClick($(this.locators.walletButton), "Wallet button");
    }

    async navigateToAccountScreen(): Promise<void> {
        await waitAndClick($(this.locators.accountButton), "Account button");
    }

    // async editLocationButton(): Promise<void> {
    // 	await waitAndClick(
    // 		await $(this.locators.editLocationButton),
    // 		"Edit Location button",
    // 	);
    // }
}

export default new appNavigationPage();
