const Logger = require('../e2e-tests/utils/loggerHelper')
const VariablesParser = require('../e2e-tests/utils/variablesParser')

exports.config = {
  runner: 'local',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 90000,
    failFast: true,
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return
      }
      const errorStr = JSON.stringify(assertion, null, '    ')
      Logger.Error(`\n${errorStr}`)
    },
  },
  sync: true,
  logLevel: 'error',
  deprecationWarnings: true,
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  reporters: ['spec'],

  services: [
    [
      'appium', {
      command: 'appium',
    }],
  ],
  port: 4723,

  beforeSession: (config, capabilities, specs) => {
    require('@babel/register')
  },
  before: function (capabilities, specs) {
    global.Logger = require('../e2e-tests/utils/loggerHelper')
    global.platform = VariablesParser.ParseVariables('platform'),
      global.env = VariablesParser.ParseVariables('env'),
      global.logLevel = VariablesParser.ParseVariables('logLevel'),
      global.isCleanAllure = VariablesParser.ParseVariables('isCleanAllure'),
      global.spec = VariablesParser.ParseVariables('spec'),
      global.PARAMS = {
        USERS: {
          CORE: { email: 'test-web+mgmt-core@perchwell.com', pass: 'perchwell' },
          AGENT: { email: 'helen.kuzniatsova@perchwell.com', pass: 'perchwell' },
        },
        MAILTRAP: {
          mailTrapApiToken: '5a04372410fa0e29aa08c5481866e740',
          inboxIdStage: '239589',
        },
        BASE_URL: 'https://staging.perchwell.com/'
      }
  },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  beforeSuite: function (suite) {
    Logger.Info('**************************************************')
    Logger.Info(`SUITE STARTED: ${spec.replace(/:.+/g, '')}`)
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  beforeTest: function (test) {
    Logger.Info(`TEST STARTED: ${test.fullName}`)
  },
  /**
   * Function to be executed after a test (in Mocha/Jasmine).
   */
  afterTest: function (test) {
    if (test.failedExpectations.length === 0) {
      Logger.Info(`TEST PASSED: ${test.fullName}`)
    } else {
      try {
        browser.takeScreenshot()
      } catch(e) {
        Logger.Info('Can not take a screenshot')
      }
      Logger.Error(`TEST FAILED: ${test.fullName}`)
    }
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  afterSuite: function (suite) {
    Logger.Info('**************************************************')
    Logger.Info('')
  },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  afterCommand: function (commandName, args, result, error) {
  },
  after: function (result, capabilities, specs) {
    Logger.Info(`Spec Result ${result}`)
  },
}