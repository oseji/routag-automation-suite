import {
    waitAndClick,
    waitAndInput,
    waitForElementToAppear,
} from "../../../helperFunctions/helperFunctions";

class DeliveryRoutePage {
    private locators = {
        deliveryDetailsFormHeading:
            'android=new UiSelector().text("Delivery Details")',
        packageWeightInputField:
            'android=new UiSelector().text("Max Weight 20kg")',
        packageDescriptionInputField:
            'android=new UiSelector().text("Describe Package ")',
        packageClassificationDropdown:
            'android=new UiSelector().text("Describe package ")',
        packageClassificationSelection: "~SHOES BAGS",
        receiversNameInputField:
            'android=new UiSelector().text("Enter Receivers Name ")',
        receiversPhoneNumberInputField:
            'android=new UiSelector().text("Enter Receivers Phone Number ")',
        productValueInputField:
            'android=new UiSelector().text("Product value in naira")',
        uploadProductImageButton: "~Click here to upload product image ",
        selectedImage:
            'android=new UiSelector().resourceId("com.google.android.documentsui:id/icon_thumb")',
        successfulImageUploadMessage:
            '//android.widget.TextView[@text="Image uploaded successfully"]',
        findCourierButton: "~Find Courier",
    };

    async waitForDeliveryDetailsFormToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.deliveryDetailsFormHeading),
            "Delivery details form heading",
        );
    }

    async inputPackageWeight(weight: string): Promise<void> {
        await waitAndInput(
            $(this.locators.packageWeightInputField),
            weight,
            "Package weight input field",
        );
    }

    async inputPackageDescription(description: string): Promise<void> {
        await waitAndInput(
            $(this.locators.packageDescriptionInputField),
            description,
            "Package description input field",
        );
    }

    async selectPackageClassification(): Promise<void> {
        await waitAndClick(
            $(this.locators.packageClassificationDropdown),
            "Package classification dropdown",
        );
        await waitAndClick(
            $(this.locators.packageClassificationSelection),
            "Package classification selection",
        );
    }

    async inputReceiversName(name: string): Promise<void> {
        await waitAndInput(
            $(this.locators.receiversNameInputField),
            name,
            "Receivers name input field",
        );
    }

    async inputReceiversPhoneNumber(phoneNumber: string): Promise<void> {
        await waitAndInput(
            $(this.locators.receiversPhoneNumberInputField),
            phoneNumber,
            "Receivers phone number input field",
        );
    }

    async inputProductValue(value: string): Promise<void> {
        await waitAndInput(
            $(this.locators.productValueInputField),
            value,
            "Product value input field",
        );
    }

    async clickUploadProductImageButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.uploadProductImageButton),
            "Upload product image button",
        );
    }

    async clickSelectedImage(): Promise<void> {
        await waitAndClick(
            $(this.locators.selectedImage),
            "Selected image from gallery",
        );
    }

    async verifySuccessfulImageUploadMessage(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.successfulImageUploadMessage),
            "Successful image upload message",
        );
    }

    async clickFindCourierButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.findCourierButton),
            "Find Courier button",
        );
    }

    async fillDeliveryDetailsFormAndContinue(
        weight: string,
        description: string,
        receiversName: string,
        receiversPhoneNumber: string,
        productValue: string,
    ): Promise<void> {
        await this.waitForDeliveryDetailsFormToLoad();
        await this.inputPackageWeight(weight);
        await this.inputPackageDescription(description);
        await this.selectPackageClassification();
        await this.inputReceiversName(receiversName);
        await this.inputReceiversPhoneNumber(receiversPhoneNumber);
        await this.inputProductValue(productValue);
        await this.clickUploadProductImageButton();
        await this.clickSelectedImage();
        await this.verifySuccessfulImageUploadMessage();
        await this.clickFindCourierButton();
    }
}

export default new DeliveryRoutePage();
