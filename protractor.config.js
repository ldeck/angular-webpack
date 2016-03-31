var env = require('./environment.js');

exports.config = {

  //seleniumAddress: env.seleniumAddress,

  seleniumPort: 4444,

  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',

  chromeDriver: './node_modules/protractor/selenium/chromedriver_2.21',

  specs: [
    'features/**/*.feature'
  ],

  capabilities: env.capabilities,

  baseUrl: env.baseUrl,

  framework: 'custom',

  frameworkPath: require.resolve('protractor-cucumber-framework'),

  cucumberOpts: {
    'format': ['pretty'],
    'tags': ['~@wip'],
    'require': 'features/**/*.js'
  }
};
