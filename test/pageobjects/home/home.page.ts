import { waitForElementToAppear } from "../../helperFunctions/helperFunctions";

class HomePage {
    private locators = {
        sendPackageButton: "~Send Package",
        searchForDeliveriesButton: "~Search for Deliveries",
        // editLocationButton: '//android.widget.TextView[@text="Edit"]',
    };

    async waitForLoginToComplete(
        userType: "sender" | "courier",
    ): Promise<void> {
        await driver.pause(5000); // Pause to allow any loading after login to complete

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

    async clickSendPackageButton(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.sendPackageButton),
            "Send Package button",
        );
        await $(this.locators.sendPackageButton).click();
    }

    async clickSearchForDeliveriesButton(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.searchForDeliveriesButton),
            "Search for Deliveries button",
        );
        await $(this.locators.searchForDeliveriesButton).click();
    }
}

export default new HomePage();
