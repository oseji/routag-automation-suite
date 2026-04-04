const getTimeout = () => parseInt(process.env.TIMEOUT || "60000");

export const waitAndClick = async (
    element: ChainablePromiseElement,
    elementDescription: string,
): Promise<void> => {
    try {
        await element.waitForDisplayed({ timeout: getTimeout() });
        await element.click();
    } catch (error) {
        throw new Error(`Failed to click ${elementDescription}: ${error}`);
    }
};

export const waitAndInput = async (
    element: ChainablePromiseElement,
    value: string,
    fieldDescription: string,
): Promise<void> => {
    try {
        await element.waitForDisplayed({ timeout: getTimeout() });
        await element.click();
        await element.clearValue();
        await element.setValue(value);
    } catch (error) {
        throw new Error(`Failed to input ${fieldDescription}: ${error}`);
    }
};

export const waitForElementToAppear = async (
    element: ChainablePromiseElement,
    description: string,
): Promise<ChainablePromiseElement> => {
    try {
        await element.waitForDisplayed({ timeout: getTimeout() });
        return element;
    } catch (error) {
        throw new Error(
            `Could not find ${description} after ${getTimeout()}ms: ${error}`,
        );
    }
};

export const waitForElementToDisappear = async (
    element: ChainablePromiseElement,
    description: string,
): Promise<void> => {
    try {
        await element.waitForDisplayed({
            timeout: getTimeout(),
            reverse: true,
        });
    } catch (error) {
        throw new Error(`${description} did not disappear: ${error}`);
    }
};

const transactionPinField = (index: number) => {
    return $(
        `android=new UiSelector().className("android.widget.EditText").instance(${index})`,
    );
};

export const inputCode = async (
    code: string,
    codeType: "transactionPin" | "otp",
    expectedLength: number,
): Promise<void> => {
    if (code.length !== expectedLength) {
        throw new Error(
            `${codeType === "transactionPin" ? "Transaction PIN" : "OTP"} must be ${expectedLength} digits, but received ${code.length} digits instead`,
        );
    }

    const digits = code.split("");

    for (let i = 0; i < digits.length; i++) {
        const field = transactionPinField(i); // consider renaming this too
        await field.waitForDisplayed({ timeout: 60000 });

        await field.click();

        // give the keyboard/focus time to settle because the first field usually needs more time
        await driver.pause(600);

        try {
            await field.clearValue();
        } catch (err) {
            // ignore
        }

        // prefer setValue, but fall back to addValue if it doesn't register
        try {
            await field.setValue(digits[i]);
        } catch (err) {
            try {
                await field.addValue(digits[i]);
            } catch (e) {
                // ignore fallback failure
            }
        }

        await driver.pause(600);

        // verify some text exists, if empty, try addValue
        try {
            const current = await field.getText();
            if (!current || current.length === 0) {
                try {
                    await field.addValue(digits[i]);
                } catch (e) {
                    // ignore
                }
                await driver.pause(600);
            }
        } catch (err) {
            // ignore getText failures
        }
    }
};

export const hideKeyboard = async (): Promise<void> => {
    try {
        await driver.hideKeyboard();
    } catch (error) {
        console.log(`Failed to hide keyboard: ${error}`);
    }
};

export const goBack = async (): Promise<void> => {
    await driver.back();
};
