import "dotenv/config";
import loginPage from "../../pageobjects/login.page";

describe("RouTag - Courier login and logout flow", () => {
	it("Should login courier successfully with valid credentials", async () => {
		await loginPage.loginUser(
			process.env.COURIER_EMAIL!,
			process.env.GENERAL_PASSWORD!,
			"courier",
		);
	});

	it("Should logout successfully", async () => {
		await loginPage.loginUser(
			process.env.COURIER_EMAIL!,
			process.env.GENERAL_PASSWORD!,
			"courier",
		);
	});

	it("Should fail to login courier with invalid credentials", async () => {
		await loginPage.loginUser(
			process.env.COURIER_EMAIL!,
			"Hello1234!",
			"courier",
		);
	});
});
