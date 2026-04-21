import {
  waitAndClick,
  waitAndInput,
  waitForElementToAppear,
} from '../../helperFunctions/helperFunctions';

class WithdrawalPage {
  private locators = {
    withdrawalScreenHeading: 'android=new UiSelector().text("How much do you want to withdraw?")',
    withdrawalAmountInputField: '//android.widget.EditText[@text="Enter an amount"]',
    withdrawalProceedButton: '~Proceed',
  };

  async waitForWithdrawalScreenToLoad(): Promise<void> {
    await waitForElementToAppear(
      $(this.locators.withdrawalScreenHeading),
      'Withdrawal screen heading'
    );
  }

  async inputWithdrawalAmount(amount: string): Promise<void> {
    await waitAndInput(
      $(this.locators.withdrawalAmountInputField),
      amount,
      'Withdrawal amount input field'
    );
  }

  async clickWithdrawalProceedButton(): Promise<void> {
    await waitAndClick($(this.locators.withdrawalProceedButton), 'Withdrawal Proceed button');
  }

  async completeWithdrawalScreenFlow(amount: string): Promise<void> {
    await this.waitForWithdrawalScreenToLoad();
    await this.inputWithdrawalAmount(amount);
    await this.clickWithdrawalProceedButton();
  }
}

export default new WithdrawalPage();
