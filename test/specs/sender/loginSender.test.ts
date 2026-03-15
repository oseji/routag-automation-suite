import "dotenv/config";
import loginPage from "../pageobjects/login.page";

describe("RouTag - Login", () => {
	it("should login sender successfully with valid credentials", async () => {
		await loginPage.loginUser(
			process.env.SENDER_EMAIL!,
			process.env.GENERAL_PASSWORD!,
			"sender",
		);
	});
});
