import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";
import homePage from "../../../pageobjects/home/home.page";
import appNavigationPage from "../../../pageobjects/appNavigation.page";
import deliveryRoutePage from "../../../pageobjects/sender/deliveryFlow/deliveryRoute.page";
import deliveryDetailsFormPage from "../../../pageobjects/sender/deliveryFlow/deliveryDetailsForm.page";
import packingInstructionsPage from "../../../pageobjects/sender/deliveryFlow/packingInstructions.page";
import setOfferPricePage from "../../../pageobjects/sender/deliveryFlow/setOfferPrice.page";

describe("RouTag Sender - Create Delivery Broadcast", () => {
    it("Should create a delivery broadcast successfully", async () => {
        //login as sender
        await loginPage.loginUser(
            process.env.SENDER_EMAIL!,
            process.env.GENERAL_PASSWORD!,
        );

        //wait for home page to load and click on send package button
        await homePage.waitForLoginToComplete("sender");
        await homePage.clickSendPackageButton();

        //fill in delivery route details and continue
        await deliveryRoutePage.fillDeliveryRouteDetailsAndContinue(
            process.env.PICKUP_LOCATION!,
            process.env.DESTINATION_LOCATION!,
        );

        //fill in delivery details form and continue
        await deliveryDetailsFormPage.fillDeliveryDetailsFormAndContinue(
            process.env.PACKAGE_WEIGHT!,
            process.env.PACKAGE_DESCRIPTION!,
            process.env.RECEIVERS_NAME!,
            process.env.RECEIVERS_PHONE_NUMBER!,
            process.env.PACKAGE_VALUE!,
        );

        //verify packing instructions page is displayed and continue
        await packingInstructionsPage.verifyPackingInstructionsPage();

        //complete set offer price flow and go back to home screen
        await setOfferPricePage.completeSetOfferPriceFlow();

        //verify that we are back on home screen
        await homePage.waitForLoginToComplete("sender");

        //navigate to deliveries screen to verify that the created delivery broadcast is listed there
        await appNavigationPage.navigateToDeliveriesScreen();
    });
});
