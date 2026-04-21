import 'dotenv/config';
import loginPage from '../../../pageobjects/login.page';
import homePage from '../../../pageobjects/home/home.page';

describe('RouTag Sender - Login With Valid Credentials', () => {
  it('Should login sender successfully with valid credentials', async () => {
    await loginPage.loginUser(process.env.SENDER_EMAIL!, process.env.GENERAL_PASSWORD!);

    await homePage.waitForLoginToComplete('sender');
  });
});
