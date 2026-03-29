import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";

describe("RouTag - Sender Sign Up", () => {
    it("Should navigate to the login screen and click the sign up button", async () => {
        await loginPage.clickSignUpButton();
    });
});
