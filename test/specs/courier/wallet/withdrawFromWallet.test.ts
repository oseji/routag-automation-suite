import "dotenv/config";
import loginPage from "../../../pageobjects/login.page";
import appNavigationPage from "../../../pageobjects/appNavigation.page";
import walletPage from "../../../pageobjects/wallet.page";

describe("Routag Courier - Withdraw Funds From Wallet", () => {
    it("Should withdraw funds from the courier wallet successfully", async () => {
        await loginPage.loginUser(
            process.env.COURIER_EMAIL!,
            process.env.GENERAL_PASSWORD!,
        );
        await loginPage.waitForLoginToComplete("courier");

        await appNavigationPage.navigateToWalletScreen();

        await walletPage.waitForWalletToOpenAndWithdrawFunds(
            process.env.TRANSACTION_PIN!,
            process.env.WITHDRAWAL_AMOUNT!,
        );
    });
});
