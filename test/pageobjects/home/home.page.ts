import {
    waitAndClick,
    waitAndInput,
    waitForElementToDisappear,
    waitForElementToAppear,
} from "../../helperFunctions/helperFunctions";

class HomePage {
    private locators = {
        sendPackageButton: "~Send Package",
        searchForDeliveriesButton: "~Search for Deliveries",
        // editLocationButton: '//android.widget.TextView[@text="Edit"]',
    };

    async waitForLoginToComplete(
        userType: "sender" | "courier",
    ): Promise<void> {
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
}

export default new HomePage();
