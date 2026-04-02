import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";

describe("RouTag Courier - Login With Invalid Credentials", () => {
    it("Should fail to login courier with invalid credentials", async () => {
        await loginPage.loginUser(
            process.env.COURIER_EMAIL!,
            process.env.INVALID_PASSWORD!,
        );
    });
});
