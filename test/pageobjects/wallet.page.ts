import {
    waitAndClick,
    waitAndInput,
    waitForElementToAppear,
    inputCode,
} from "../helperFunctions/helperFunctions";

class WalletPage {
    private locators = {
        walletHeading: 'android=new UiSelector().text("My Wallet")',
        withdrawButton: "~Withdraw",
        choosePayoutAccountHeading:
            'android=new UiSelector().text("Choose Payout  Account")',
        selectedPayoutAccount:
            "~OPay Digital Services Limited (OPay), OSEJIADE JOHN OZIEGBE, 7019952903",
        transactionHistoryButton:
            '//android.view.ViewGroup[@content-desc="Transaction History"]/android.view.ViewGroup',
        transactionHistoryScreenHeading:
            'android=new UiSelector().text("Transaction History")',
        withdrawalScreenHeading:
            'android=new UiSelector().text("How much do you want to withdraw?")',
        withdrawalAmountInputField:
            'android=new UiSelector().text("Enter an amount")',
        withdrawalProceedButton: "~Proceed",
        transactionPinScreenHeading:
            'android=new UiSelector().text("Transaction Pin")',
        transactionPinProceedButton: "~Proceed",
        withdrawalSuccessMessage:
            '//android.widget.TextView[@text="Withdrawal Initiated and processing"]',
    };

    // private transactionPinField(index: number) {
    //     return $(
    //         `android=new UiSelector().className("android.widget.EditText").instance(${index})`,
    //     );
    // }

    async waitForWalletScreenToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.walletHeading),
            "Wallet screen heading",
        );
    }

    async clickWithdrawButton(): Promise<void> {
        await waitAndClick($(this.locators.withdrawButton), "Withdraw button");
    }

    async selectPayoutAccount(): Promise<void> {
        await waitAndClick(
            $(this.locators.selectedPayoutAccount),
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
            $(this.locators.withdrawalAmountInputField),
            amount,
            "Withdrawal amount input field",
        );
    }

    async clickWithdrawalProceedButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.withdrawalProceedButton),
            "Withdrawal Proceed button",
        );
    }

    async waitForTransactionPinScreenToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.transactionPinScreenHeading),
            "Transaction PIN screen heading",
        );
    }

    // async inputCode(code: string, expectedLength: number): Promise<void> {
    //     if (code.length !== expectedLength) {
    //         throw new Error(
    //             `Code must be ${expectedLength} digits, but received ${code.length} digits instead`,
    //         );
    //     }

    //     const digits = code.split("");

    //     for (let i = 0; i < digits.length; i++) {
    //         const field = this.transactionPinField(i); // consider renaming this too
    //         await field.waitForDisplayed({ timeout: 60000 });

    //         await field.click();

    //         // give the keyboard/focus time to settle (first field often needs more time)
    //         await driver.pause(600);

    //         try {
    //             await field.clearValue();
    //         } catch (err) {
    //             // ignore
    //         }

    //         // prefer setValue, but fall back to addValue if it doesn't register
    //         try {
    //             await field.setValue(digits[i]);
    //         } catch (err) {
    //             try {
    //                 await field.addValue(digits[i]);
    //             } catch (e) {
    //                 // ignore fallback failure
    //             }
    //         }

    //         await driver.pause(600);

    //         // verify some text exists (masked fields may still return bullets); if empty, try addValue
    //         try {
    //             const current = await field.getText();
    //             if (!current || current.length === 0) {
    //                 try {
    //                     await field.addValue(digits[i]);
    //                 } catch (e) {
    //                     // ignore
    //                 }
    //                 await driver.pause(600);
    //             }
    //         } catch (err) {
    //             // ignore getText failures
    //         }
    //     }
    // }

    async clickTransactionPinProceedButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.transactionPinProceedButton),
            "Transaction PIN Proceed button",
        );
    }

    async waitForWithdrawalSuccessMessage(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.withdrawalSuccessMessage),
            "Withdrawal success message",
        );
    }

    async clickTransactionHistoryButton(): Promise<void> {
        await waitAndClick(
            $(this.locators.transactionHistoryButton),
            "Transaction History button",
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
        // await this.inputCode(transactionPin, 4);
        await inputCode(transactionPin, 4);
        await this.clickTransactionPinProceedButton();
        await this.waitForWithdrawalSuccessMessage();
    }
}

export default new WalletPage();
