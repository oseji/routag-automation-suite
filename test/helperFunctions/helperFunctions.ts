const getTimeout = () => parseInt(process.env.TIMEOUT || "20000");

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
