import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";

describe("RouTag - Courier Login With Valid Credentials", () => {
    it("Should login courier successfully with valid credentials", async () => {
        await loginPage.loginUser(
            process.env.COURIER_EMAIL!,
            process.env.GENERAL_PASSWORD!,
        );

        await loginPage.waitForLoginToComplete("courier");
    });
});
