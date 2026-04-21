import 'dotenv/config';

import loginPage from '../../../pageobjects/login.page';
import homePage from '../../../pageobjects/home/home.page';
import appNavigationPage from '../../../pageobjects/appNavigation.page';
import accountPage from '../../../pageobjects/accountPageObjects/account.page';
import accountSwitchScreenPage from '../../../pageobjects/accountPageObjects/accountSwitching/accountSwitchScreen.page';
import createProfileScreenPage from '../../../pageobjects/accountPageObjects/accountSwitching/createProfileScreen.page';

describe('RouTag Sender- Switch Account From Sender To Courier Profile', () => {
  it('Should switch account from sender to courier profile', async () => {
    await loginPage.loginUser(process.env.SENDER_EMAIL!, process.env.GENERAL_PASSWORD!);
    await homePage.waitForLoginToComplete('sender');

    await appNavigationPage.navigateToAccountScreen();

    await accountPage.startAccountSwitchingFlow('Courier');

    const needsToCreateProfile = await createProfileScreenPage.isCreateProfileScreenDisplayed();

    if (needsToCreateProfile) {
      await createProfileScreenPage.fullCreateProfileFlow('Courier', 'Public Transportation');
    }

    await accountSwitchScreenPage.completeAccountSwitchingFlow('Courier');

    await homePage.waitForLoginToComplete('courier');
  });
});
