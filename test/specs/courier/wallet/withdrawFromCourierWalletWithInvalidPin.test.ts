import 'dotenv/config';
import loginPage from '../../../pageobjects/login.page';
import homePage from '../../../pageobjects/home/home.page';
import appNavigationPage from '../../../pageobjects/appNavigation.page';
import walletScreenPage from '../../../pageobjects/courierWallet/walletScreen.page';
import transactionPinScreenPage from '../../../pageobjects/courierWallet/transactionPinScreen.page';
import withdrawalScreenPage from '../../../pageobjects/courierWallet/withdrawalScreen.page';

describe('Routag Courier - Withdraw Funds From Wallet With Invalid Pin', () => {
  it('Should display an error message when an invalid PIN is entered and proceed button is clicked', async () => {
    await loginPage.loginUser(process.env.COURIER_EMAIL!, process.env.GENERAL_PASSWORD!);
    await homePage.waitForLoginToComplete('courier');

    await appNavigationPage.navigateToWalletScreen();

    await walletScreenPage.completeWalletScreenFlow();
    await withdrawalScreenPage.completeWithdrawalScreenFlow(process.env.WITHDRAWAL_AMOUNT!);
    await transactionPinScreenPage.completeTransactionPinScreenFlow(
      false,
      process.env.INVALID_TRANSACTION_PIN!
    );
  });
});
