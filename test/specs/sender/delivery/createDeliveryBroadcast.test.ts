import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";
import homePage from "../../../pageobjects/home/home.page";
import deliveryRoutePage from "../../../pageobjects/sender/deliveryFlow/deliveryRoute.page";
import deliveryDetailsFormPage from "../../../pageobjects/sender/deliveryFlow/deliveryDetailsForm.page";
import packingInstructionsPage from "../../../pageobjects/sender/deliveryFlow/packingInstructions.page";

describe("RouTag Sender - Create Delivery Broadcast", () => {
    it("Should create a delivery broadcast successfully", async () => {
        await loginPage.loginUser(
            process.env.SENDER_EMAIL!,
            process.env.GENERAL_PASSWORD!,
        );

        await homePage.waitForLoginToComplete("sender");
        await homePage.clickSendPackageButton();

        await deliveryRoutePage.fillDeliveryRouteDetailsAndContinue(
            process.env.PICKUP_LOCATION!,
            process.env.DESTINATION_LOCATION!,
        );
        await deliveryDetailsFormPage.fillDeliveryDetailsFormAndContinue(
            process.env.PACKAGE_WEIGHT!,
            process.env.PACKAGE_DESCRIPTION!,
            process.env.RECEIVERS_NAME!,
            process.env.RECEIVERS_PHONE_NUMBER!,
            process.env.PACKAGE_VALUE!,
        );

        await packingInstructionsPage.verifyPackingInstructionsPage();
    });
});
