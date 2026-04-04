import {
    inputCode,
    waitAndClick,
    waitForElementToAppear,
} from "../../helperFunctions/helperFunctions";

class TransactionPinPage {
    private locators = {
        transactionPinScreenHeading:
            'android=new UiSelector().text("Transaction Pin")',
        transactionPinProceedButton: "~Proceed",
        withdrawalSuccessMessage:
            '//android.widget.TextView[@text="Withdrawal Initiated and processing"]',
        withdrawalInvalidPinMessage:
            '//android.widget.TextView[@text="Incorrect PIN. Please verify and try again."]',
    };

    async waitForTransactionPinScreenToLoad(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.transactionPinScreenHeading),
            "Transaction PIN screen heading",
        );
    }

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

    async waitForInvalidPinMessage(): Promise<void> {
        await waitForElementToAppear(
            $(this.locators.withdrawalInvalidPinMessage),
            "Invalid PIN message",
        );
    }

    async completeTransactionPinScreenFlow(
        isValidPin: boolean,
        pin: string,
    ): Promise<void> {
        await this.waitForTransactionPinScreenToLoad();
        await inputCode(pin, "transactionPin", 4);
        await this.clickTransactionPinProceedButton();

        if (isValidPin) {
            await this.waitForWithdrawalSuccessMessage();
        } else {
            await this.waitForInvalidPinMessage();
        }
    }
}

export default new TransactionPinPage();
