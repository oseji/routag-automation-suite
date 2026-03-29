import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";

describe("RouTag - Sender Login With Valid Credentials And Then Logout", () => {
    it("Should login sender successfully with valid credentials and then logout", async () => {
        await loginPage.loginUser(
            process.env.SENDER_EMAIL!,
            process.env.GENERAL_PASSWORD!,
        );

        await loginPage.waitForLoginToComplete("sender");
    });
});
