import {
    waitAndClick,
    waitAndInput,
    waitForElementToAppear,
} from "../helperFunctions/helperFunctions";

class WalletPage {
    private locators = {
        walletHeading: '//android.widget.TextView[@text="My Wallet"]',
        withdrawButton: '//android.view.ViewGroup[@content-desc="Withdraw"]',
        choosePayoutAccountHeading:
            '//android.widget.TextView[@text="Choose Payout Account"]',
        selectedPayoutAccount:
            '//android.view.ViewGroup[@content-desc="OPay Digital Services Limited (OPay), OSEJIADE JOHN OZIEGBE, 7019952903"]',
        transactionHistoryButton:
            '//android.view.ViewGroup[@content-desc="Transaction History"]/android.view.ViewGroup',
        withdrawalScreenHeading:
            '//android.widget.TextView[@text="How much do you want to widthdraw?"]',
        withdrawalAmountInputField:
            '//android.widget.EditText[@text="Enter an amount"]',
        withdrawalProceedButton:
            '//android.view.ViewGroup[@content-desc="Proceed"]',
        transactionPinScreenHeading:
            '//android.view.ViewGroup[@content-desc="Proceed"]',
        transactionPinProceedButton:
            '//android.view.ViewGroup[@content-desc="Proceed"]',
        withdrawalSuccessMessage:
            '//android.widget.TextView[@text="Withdrawal Initiated and processing"]',
    };

    private transactionPinField(index: number) {
        return $(
            `android=new UiSelector().className("android.widget.EditText").instance(${index})`,
        );
    }

    async waitForWalletScreenToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.walletHeading),
            "Wallet screen heading",
        );
    }

    async clickWithdrawButton(): Promise<void> {
        await waitAndClick(
            await $(this.locators.withdrawButton),
            "Withdraw button",
        );
    }

    async selectPayoutAccount(): Promise<void> {
        await waitAndClick(
            await $(this.locators.selectedPayoutAccount),
            "Selected payout account",
        );
    }

    async waitForWithdrawalScreenToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.withdrawalScreenHeading),
            "Withdrawal screen heading",
        );
    }

    async inputWithdrawalAmount(amount: string): Promise<void> {
        await waitAndInput(
            await $(this.locators.withdrawalAmountInputField),
            amount,
            "Withdrawal amount input field",
        );
    }

    async clickWithdrawalProceedButton(): Promise<void> {
        await waitAndClick(
            await $(this.locators.withdrawalProceedButton),
            "Withdrawal Proceed button",
        );
    }

    async waitForTransactionPinScreenToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.transactionPinScreenHeading),
            "Transaction PIN screen heading",
        );
    }

    async inputTransactionPin(transactionPin: string): Promise<void> {
        if (transactionPin.length !== 4) {
            throw new Error(
                `Transaction PIN must be 4 digits, but received ${transactionPin.length} digits instead`,
            );
        }

        const digits = transactionPin.split("");

        for (let i = 0; i < digits.length; i++) {
            const field = this.transactionPinField(i);
            await field.waitForDisplayed({ timeout: 10000 });

            if (i === 3) {
                await field.addValue(digits[i]);
            } else {
                await field.setValue(digits[i]);
            }

            await driver.pause(500);
        }
    }

    async clickTransactionPinProceedButton(): Promise<void> {
        await waitAndClick(
            await $(this.locators.transactionPinProceedButton),
            "Transaction PIN Proceed button",
        );
    }

    async waitForWithdrawalSuccessMessage(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.withdrawalSuccessMessage),
            "Withdrawal success message",
        );
    }

    async waitForWalletToOpenAndWithdrawFunds(
        transactionPin: string,
        withdrawalAmount: string,
    ): Promise<void> {
        await this.waitForWalletScreenToLoad();
        await this.clickWithdrawButton();
        await this.selectPayoutAccount();
        await this.waitForWithdrawalScreenToLoad();
        await this.inputWithdrawalAmount(withdrawalAmount);
        await this.clickWithdrawalProceedButton();
        await this.waitForTransactionPinScreenToLoad();
        await this.inputTransactionPin(transactionPin);
        await this.clickTransactionPinProceedButton();
        await this.waitForWithdrawalSuccessMessage();
    }
}

export default new WalletPage();
