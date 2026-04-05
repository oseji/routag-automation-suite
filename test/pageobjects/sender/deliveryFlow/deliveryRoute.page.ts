import {
    waitAndClick,
    waitAndInput,
    waitForElementToAppear,
} from "../../../helperFunctions/helperFunctions";

class DeliveryRoutePage {
    private locators = {
        deliveryRoutePageHeading:
            'android=new UiSelector().text("Set Delivery Route")',
        clearPickupLocationButton:
            'android=new UiSelector().className("com.horcrux.svg.PathView").instance(3)',
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
        await this.clickClearPickupLocationButton();
        await this.inputPickupLocation(pickupLocation);
        await this.selectPickupLocation();
        await this.inputDestinationLocation(destinationLocation);
        await this.selectDestinationLocation();
    }
}

export default new DeliveryRoutePage();
