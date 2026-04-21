import {
    waitAndClick,
    waitAndInput,
    waitForElementToAppear,
} from "../../../helperFunctions/helperFunctions";

class DeliveryRoutePage {
    private locators = {
        deliveryRoutePageHeading:
            'android=new UiSelector().text("Set Delivery Route")',
        clearDestinationLocationButton:
            '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[6]/com.horcrux.svg.SvgView',
        clearPickupLocationButton:
            '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[3]',
        pickupLocationInputField:
            'android=new UiSelector().text("Enter source address")',
        destinationLocationInputField:
            'android=new UiSelector().text("Enter destination address")',
        pickupLocationSelection: "~41 Road, Festac Town, Lagos, Nigeria",
        destinationLocationSelection:
            "~Blue Line Marina Train Station, Train Station, Marina Road, Lagos, Nigeria",
    };

    async waitForDeliveryRoutePageToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.deliveryRoutePageHeading),
            "Delivery route page heading",
        );
    }

    async clickClearPickupLocationButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.clearPickupLocationButton),
            "Clear pickup location button",
        );
    }

    async clickClearDestinationLocationButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.clearDestinationLocationButton),
            "Clear destination location button",
        );
    }

    async inputPickupLocation(address: string): Promise<void> {
        await waitAndInput(
            $(this.locators.pickupLocationInputField),
            address,
            "Pickup location input field",
        );
    }

    async selectPickupLocation(): Promise<void> {
        await waitAndClick(
            $(this.locators.pickupLocationSelection),
            "Pickup location selection",
        );
    }

    async inputDestinationLocation(address: string): Promise<void> {
        await waitAndInput(
            $(this.locators.destinationLocationInputField),
            address,
            "Destination input field",
        );
    }

    async selectDestinationLocation(): Promise<void> {
        await waitAndClick(
            $(this.locators.destinationLocationSelection),
            "Destination location selection",
        );
    }

    async fillDeliveryRouteDetailsAndContinue(
        pickupLocation: string,
        destinationLocation: string,
    ): Promise<void> {
        await this.waitForDeliveryRoutePageToLoad();

        // clear both pickup and destination fields upfront if pre-filled
        const clearPickup = $(this.locators.clearPickupLocationButton);
        if (await clearPickup.isExisting()) {
            await this.clickClearPickupLocationButton();
        }

        const clearDestination = $(
            this.locators.clearDestinationLocationButton,
        );
        if (await clearDestination.isExisting()) {
            await this.clickClearDestinationLocationButton();
        }

        await this.inputPickupLocation(pickupLocation);
        await driver.pause(2000); // Pause to allow location suggestions to load
        await this.selectPickupLocation();

        await this.inputDestinationLocation(destinationLocation);
        await driver.pause(2000); // Pause to allow location suggestions to load
        await this.selectDestinationLocation();
    }
}

export default new DeliveryRoutePage();
