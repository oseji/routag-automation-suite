import { waitAndClick, waitForElementToAppear } from '../../helperFunctions/helperFunctions';

class WalletPage {
  private locators = {
    walletHeading: 'android=new UiSelector().text("My Wallet")',
    withdrawButton: '~Withdraw',
    transactionHistoryButton:
      '//android.view.ViewGroup[@content-desc="Transaction History"]/android.view.ViewGroup',
    choosePayoutAccountHeading: 'android=new UiSelector().text("Choose Payout  Account")',
    selectedPayoutAccount:
      '~OPay Digital Services Limited (OPay), OSEJIADE JOHN OZIEGBE, 7019952903',
  };

  async waitForWalletScreenToLoad(): Promise<void> {
    await waitForElementToAppear($(this.locators.walletHeading), 'Wallet screen heading');
  }

  async clickWithdrawButton(): Promise<void> {
    await waitAndClick($(this.locators.withdrawButton), 'Withdraw button');
  }

  async clickTransactionHistoryButton(): Promise<void> {
    await waitAndClick($(this.locators.transactionHistoryButton), 'Transaction History button');
  }

  async waitForChoosePayoutAccountModalToLoad(): Promise<void> {
    await waitForElementToAppear(
      $(this.locators.choosePayoutAccountHeading),
      'Choose Payout Account modal heading'
    );
  }

  async selectPayoutAccount(): Promise<void> {
    await waitAndClick($(this.locators.selectedPayoutAccount), 'Selected payout account');
  }

  async completeWalletScreenFlow(): Promise<void> {
    await this.waitForWalletScreenToLoad();
    await this.clickWithdrawButton();
    await this.waitForChoosePayoutAccountModalToLoad();
    await this.selectPayoutAccount();
  }
}

export default new WalletPage();
