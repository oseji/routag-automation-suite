import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";

describe("RouTag - Sender Login With Invalid Credentials", () => {
	it("Should fail to login sender with invalid credentials", async () => {
		await loginPage.loginUser(
			process.env.SENDER_EMAIL!,
			process.env.INVALID_PASSWORD!,
		);

		await loginPage.verifyInvalidCredentialsToast();
	});
});
