import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";

describe("RouTag - Sender Login With Valid Credentials", () => {
    it("Should login sender successfully with valid credentials", async () => {
        await loginPage.loginUser(
            process.env.SENDER_EMAIL!,
            process.env.GENERAL_PASSWORD!,
        );

        await loginPage.waitForLoginToComplete("sender");
    });
});
