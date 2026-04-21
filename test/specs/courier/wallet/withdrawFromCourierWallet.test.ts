import 'dotenv/config';
import loginPage from '../../../pageobjects/login.page';
import appNavigationPage from '../../../pageobjects/appNavigation.page';
import walletScreenPage from '../../../pageobjects/courierWallet/walletScreen.page';
import transactionPinScreenPage from '../../../pageobjects/courierWallet/transactionPinScreen.page';
import withdrawalScreenPage from '../../../pageobjects/courierWallet/withdrawalScreen.page';
import homePage from '../../../pageobjects/home/home.page';

describe('Routag Courier - Withdraw Funds From Wallet', () => {
  it('Should withdraw funds from the courier wallet successfully', async () => {
    await loginPage.loginUser(process.env.COURIER_EMAIL!, process.env.GENERAL_PASSWORD!);
    await homePage.waitForLoginToComplete('courier');

    await appNavigationPage.navigateToWalletScreen();

    await walletScreenPage.completeWalletScreenFlow();
    await withdrawalScreenPage.completeWithdrawalScreenFlow(process.env.WITHDRAWAL_AMOUNT!);
    await transactionPinScreenPage.completeTransactionPinScreenFlow(
      true,
      process.env.TRANSACTION_PIN!
    );
  });
});
