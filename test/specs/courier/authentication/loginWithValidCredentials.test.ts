import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";

describe("RouTag - Courier Login With Valid Credentials And Then Logout", () => {
    it("Should login courier successfully with valid credentials and then logout", async () => {
        await loginPage.loginUser(
            process.env.COURIER_EMAIL!,
            process.env.GENERAL_PASSWORD!,
        );

        await loginPage.waitForLoginToComplete("courier");
    });
});
