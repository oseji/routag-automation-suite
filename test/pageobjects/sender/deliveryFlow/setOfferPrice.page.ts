import {
    waitForElementToAppear,
    waitAndClick,
} from "../../../helperFunctions/helperFunctions";

class SetOfferPricePage {
    private locators = {
        setOfferPriceHeading: 'android=new UiSelector().text("Your Offer")',
        decreasePriceButton:
            'android=new UiSelector().description("100").instance(0)',
        increasePriceButton:
            'android=new UiSelector().description("100").instance(1)',
        proceedButton: "~Proceed",
        closeButton: "~Close",
        closeLoadingLayout:
            'android=new UiSelector().description("Close").instance(1)',
    };

    async waitForSetOfferPricePageToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.setOfferPriceHeading),
            "Set Offer Price heading",
        );
    }

    async clickDecreasePriceButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.decreasePriceButton),
            "Decrease price button",
        );
    }

    async clickIncreasePriceButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.increasePriceButton),
            "Increase price button",
        );
    }

    async clickProceedButton(): Promise<void> {
        await waitAndClick($(this.locators.proceedButton), "Proceed button");
    }

    async clickCloseButton(): Promise<void> {
        await waitAndClick($(this.locators.closeButton), "Close button");
    }

    async clickCloseLoadingLayout(): Promise<void> {
        await waitAndClick(
            $(this.locators.closeLoadingLayout),
            "Close loading layout",
        );
    }

    async completeSetOfferPriceFlow(): Promise<void> {
        await this.waitForSetOfferPricePageToLoad();
        await driver.pause(6000); // Pause to allow the map load and stabilize before interacting with proceed buttons
        await this.clickProceedButton();
        await driver.pause(5000); // Pause to allow loading layout to appear
        await this.clickCloseLoadingLayout();
        await this.clickCloseButton(); //click to close and go back to home screen
    }
}

export default new SetOfferPricePage();
