import { waitForElementToAppear } from '../../helperFunctions/helperFunctions';

class TransactionHistoryPage {
  private locators = {
    transactionHistoryHeading: 'android=new UiSelector().text("Transaction History")',
  };

  async waitForTransactionHistoryScreenToLoad(): Promise<void> {
    await waitForElementToAppear(
      $(this.locators.transactionHistoryHeading),
      'Transaction History screen heading'
    );
  }
}

export default new TransactionHistoryPage();
