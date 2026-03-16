import "dotenv/config";
import loginPage from "../../pageobjects/login.page";

describe("RouTag - Sender Login", () => {
	it("Should login sender successfully with valid credentials", async () => {
		await loginPage.loginUser(
			process.env.SENDER_EMAIL!,
			process.env.GENERAL_PASSWORD!,
			"sender",
		);
	});

	it("Should fail to login sender with invalid credentials", async () => {
		await loginPage.loginUser(
			process.env.SENDER_EMAIL!,
			"Hello1234!",
			"sender",
		);
	});
});
