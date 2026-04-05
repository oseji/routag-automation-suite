import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";
import homePage from "../../../pageobjects/home/home.page";

describe("RouTag Courier - Login With Valid Credentials", () => {
    it("Should login courier successfully with valid credentials", async () => {
        await loginPage.loginUser(
            process.env.COURIER_EMAIL!,
            process.env.GENERAL_PASSWORD!,
        );

        await homePage.waitForLoginToComplete("courier");
    });
});
