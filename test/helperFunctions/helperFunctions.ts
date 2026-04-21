import { ChainablePromiseElement } from 'webdriverio';

const getTimeout = () => parseInt(process.env.TIMEOUT || '90000');

export async function scrollToElement(element: ChainablePromiseElement): Promise<void> {
  const isDisplayed = await element.isDisplayed().catch(() => false);
  if (!isDisplayed) {
    await driver.execute('mobile: scrollGesture', {
      left: 100,
      top: 300,
      width: 300,
      height: 600,
      direction: 'down',
      percent: 0.5,
    });
  }
}

export const waitAndClick = async (
  element: ChainablePromiseElement,
  elementDescription: string
): Promise<void> => {
  try {
    await element.waitForDisplayed({ timeout: getTimeout() });
    await element.click();
  } catch (error) {
    throw new Error(`Failed to click ${elementDescription}: ${String(error)}`);
  }
};

export const waitAndInput = async (
  element: ChainablePromiseElement,
  value: string,
  fieldDescription: string
): Promise<void> => {
  try {
    await element.waitForDisplayed({ timeout: getTimeout() });
    await element.click();
    await element.clearValue();
    await element.setValue(value);
  } catch (error) {
    throw new Error(`Failed to input ${fieldDescription}: ${String(error)}`);
  }
};

export const waitForElementToAppear = async (
  element: ChainablePromiseElement,
  description: string
): Promise<ChainablePromiseElement> => {
  try {
    await element.waitForDisplayed({ timeout: getTimeout() });
    return element;
  } catch (error) {
    throw new Error(`Could not find ${description} after ${getTimeout()}ms: ${String(error)}`);
  }
};

export const waitForElementToDisappear = async (
  element: ChainablePromiseElement,
  description: string
): Promise<void> => {
  try {
    await element.waitForDisplayed({
      timeout: getTimeout(),
      reverse: true,
    });
  } catch (error) {
    throw new Error(`${description} did not disappear: ${String(error)}`);
  }
};

const transactionPinField = (index: number) => {
  return $(`android=new UiSelector().className("android.widget.EditText").instance(${index})`);
};

export const inputCode = async (
  code: string,
  codeType: 'transactionPin' | 'otp',
  expectedLength: number
): Promise<void> => {
  if (code.length !== expectedLength) {
    throw new Error(
      `${codeType === 'transactionPin' ? 'Transaction PIN' : 'OTP'} must be ${expectedLength} digits, but received ${code.length} digits instead`
    );
  }

  const digits = code.split('');

  for (let i = 0; i < digits.length; i++) {
    const field = transactionPinField(i);
    await field.waitForDisplayed({ timeout: 60000 });
    await field.click();
    await driver.pause(600);

    try {
      await field.clearValue();
    } catch {
      // ignore
    }

    try {
      await field.setValue(digits[i]);
    } catch {
      try {
        await field.addValue(digits[i]);
      } catch {
        // ignore fallback failure
      }
    }

    await driver.pause(600);

    try {
      const current = await field.getText();
      if (!current || current.length === 0) {
        try {
          await field.addValue(digits[i]);
        } catch {
          // ignore
        }
        await driver.pause(600);
      }
    } catch (getTextErr) {
      // eslint-disable-next-line no-console
      console.error(`Failed to verify input for ${codeType} field ${i + 1}: ${String(getTextErr)}`);
    }
  }
};

export const hideKeyboard = async (): Promise<void> => {
  try {
    await driver.hideKeyboard();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to hide keyboard: ${String(error)}`);
  }
};

export const goBack = async (): Promise<void> => {
  await driver.back();
};
