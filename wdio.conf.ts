import * as dotenv from 'dotenv';
dotenv.config();

export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  port: 4723,

  specs: ['./test/specs/**/*.ts'],
  exclude: [],

  maxInstances: 10,

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'Pixel_7',
      'appium:avd': 'Pixel_7',
      'appium:avdLaunchTimeout': 120000,
      'appium:avdReadyTimeout': 120000,
      'appium:platformVersion': '16.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': process.env.APP_PATH!,
      'appium:appPackage': 'com.vastracktech.routag',
      'appium:noReset': false,
      'appium:autoGrantPermissions': true,
    },
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 60000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 3,

  services: [],

  framework: 'mocha',
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 600000,
  },
};
