import {
    waitForElementToAppear,
    waitAndClick,
} from "../../../helperFunctions/helperFunctions";

class CreateProfileScreen {
    private locators = {
        createProfileScreenHeading:
            'android=new UiSelector().text("Create New Profile")',
        meansOfTravelDropdown:
            'android=new UiSelector().text("Select Your Travel Means")',
        publicTransportOption:
            'android=new UiSelector().text("Public Transportation")',
        privateVehicleOption:
            'android=new UiSelector().text("Private Vehicle")',
        uploadutilityBillButton:
            'android=new UiSelector().text("Select an image")',
        utilityBillImage:
            'android=new UiSelector().resourceId("com.google.android.documentsui:id/icon_thumb").instance(0)',
        proceedButton: "~Proceed",
    };

    async waitForCreateProfileScreenToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.createProfileScreenHeading),
            "Create profile screen heading",
        );
    }

    async isCreateProfileScreenDisplayed(timeout = 10000): Promise<boolean> {
        try {
            await $(this.locators.createProfileScreenHeading).waitForDisplayed({
                timeout,
            });
            return true;
        } catch {
            return false;
        }
    }

    async selectMeansOfTravel(
        meansOfTravel: "Public Transportation" | "Private Vehicle",
    ): Promise<void> {
        await waitAndClick(
            $(this.locators.meansOfTravelDropdown),
            "Means of travel dropdown",
        );

        if (meansOfTravel === "Public Transportation") {
            await waitAndClick(
                $(this.locators.publicTransportOption),
                "Public transportation option",
            );
        } else if (meansOfTravel === "Private Vehicle") {
            await waitAndClick(
                $(this.locators.privateVehicleOption),
                "Private vehicle option",
            );
        }
    }

    async uploadUtilityBill(): Promise<void> {
        await waitAndClick(
            $(this.locators.uploadutilityBillButton),
            "Upload utility bill button",
        );
        await waitAndClick(
            $(this.locators.utilityBillImage),
            "Utility bill image",
        );
    }

    async clickProceedButton(): Promise<void> {
        await waitAndClick($(this.locators.proceedButton), "Proceed button");
    }

    async fullCreateProfileFlow(
        profile: "Sender" | "Courier",
        meansOfTravel: "Public Transportation" | "Private Vehicle",
    ): Promise<void> {
        if (profile === "Courier") {
            await this.waitForCreateProfileScreenToLoad();
            await this.selectMeansOfTravel(meansOfTravel);
            await this.uploadUtilityBill();
        }

        await this.clickProceedButton();
    }
}

export default new CreateProfileScreen();
