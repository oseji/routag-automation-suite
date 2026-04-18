import "dotenv/config";

import loginPage from "../../../pageobjects/login.page";
import homePage from "../../../pageobjects/home/home.page";
import appNavigationPage from "../../../pageobjects/appNavigation.page";
import accountPage from "../../../pageobjects/accountPageObjects/account.page";
import accountSwitchScreenPage from "../../../pageobjects/accountPageObjects/accountSwitching/accountSwitchScreen.page";

describe("RouTag Sender- Switch Account From Courier To Sender Profile", () => {
    it("Should switch account from courier to sender profile", async () => {
        await loginPage.loginUser(
            process.env.COURIER_EMAIL!,
            process.env.GENERAL_PASSWORD!,
        );
        await homePage.waitForLoginToComplete("courier");

        await appNavigationPage.navigateToAccountScreen();

        await accountPage.clickSwitchAccountButton();

        await accountSwitchScreenPage.fullSwitchAccountFlow("Sender");

        await homePage.waitForLoginToComplete("sender");
    });
});
