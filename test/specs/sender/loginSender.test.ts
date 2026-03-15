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
});
