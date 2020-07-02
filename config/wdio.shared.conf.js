const common = require ('../common.js')
// const Logger = require ('../e2e-tests/utils/loggerHelper')

exports.config = {
    runner: 'local',
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 90000,
    },
    sync: true,
    logLevel: 'silent',//'info',
    deprecationWarnings: true,
    bail: 0,
    baseUrl: 'http://the-internet.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    reporters: ['spec'],

    services: ['appium'],
    appium: {
        command: 'appium'
    },
    port: 4723,
    beforeSession: (config, capabilities, specs) => {
        require('@babel/register');
    },
    before: function (capabilities, specs) {
        global.Logger = require('../e2e-tests/utils/loggerHelper')//require('./helpers/loggerHelper')
        global.DEVICE = driver.isAndroid === true ? 'Android' : 'IOS'
    },
    onPrepare: () => {

    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    beforeSuite: function (suite) {
        Logger.Info('**************************************************')
        Logger.Info(`SUITE STARTED: ${suite.title.replace(':', '')}`)
        // global.SUITE = suite.title.replace(':', '')
    },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function (test) {
        Logger.Info(`TEST STARTED: ${test.fullName}`)
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: function (test) {
        if (test.passed) {
            Logger.Info(`TEST PASSED: ${test.title}`)
        } else {
            browser.takeScreenshot()
            Logger.Error(`TEST FAILED: ${test.title}`)
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
}
