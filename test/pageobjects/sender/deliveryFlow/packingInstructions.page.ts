import { waitForElementToAppear, waitAndClick } from '../../../helperFunctions/helperFunctions';

class PackingInstructionsPage {
  private locators = {
    packingInstructionsHeading: 'android=new UiSelector().text("Packing Instructions")',
    okayButton: '~Okay',
  };

  async waitForPackingInstructionsToLoad(): Promise<void> {
    await waitForElementToAppear(
      $(this.locators.packingInstructionsHeading),
      'Packing instructions heading'
    );
  }

  async clickOkayButton(): Promise<void> {
    await waitAndClick($(this.locators.okayButton), 'Okay button');
  }

  async verifyPackingInstructionsPage(): Promise<void> {
    await this.waitForPackingInstructionsToLoad();
    await this.clickOkayButton();
  }
}

export default new PackingInstructionsPage();
