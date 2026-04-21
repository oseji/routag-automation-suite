import { waitAndClick, waitForElementToAppear } from '../../../helperFunctions/helperFunctions';

class accountSwitchScreen {
  private locators = {
    accountSwitchScreenHeading: 'android=new UiSelector().text("Switch Your Role")',
    senderRoleOption:
      '//android.view.ViewGroup[@content-desc="Sender , Send packages to any destination."]/android.view.ViewGroup',
    courierRoleOption:
      '//android.view.ViewGroup[@content-desc="Individual Courier, Earn by delivering packages along your route."]/android.view.ViewGroup',
  };

  async waitForAccountSwitchScreenToLoad(): Promise<void> {
    await waitForElementToAppear(
      $(this.locators.accountSwitchScreenHeading),
      'Account switch screen heading'
    );
  }

  async switchRole(role: 'Sender' | 'Courier'): Promise<void> {
    if (role === 'Sender') {
      await waitAndClick($(this.locators.senderRoleOption), 'Sender role option');
    } else if (role === 'Courier') {
      await waitAndClick($(this.locators.courierRoleOption), 'Courier role option');
    }
  }

  async completeAccountSwitchingFlow(role: 'Sender' | 'Courier'): Promise<void> {
    await this.waitForAccountSwitchScreenToLoad();
    await this.switchRole(role);
  }
}

export default new accountSwitchScreen();
