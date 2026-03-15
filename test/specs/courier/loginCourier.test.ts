import "dotenv/config";
import loginPage from "../../pageobjects/login.page";

describe("RouTag - Courier Login", () => {
	it("Should login courier successfully with valid credentials", async () => {
		await loginPage.loginUser(
			process.env.COURIER_EMAIL!,
			process.env.GENERAL_PASSWORD!,
			"courier",
		);
	});
});
