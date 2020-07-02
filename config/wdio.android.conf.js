const path  = require('path')
const {config} = require('./wdio.shared.conf')

config.specs = [
    './e2e-tests/specs/**/*.js'
]

config.capabilities = [
    {
        platformName: 'Android',
        maxInstances: 1,
        // For W3C the appium capabilities need to have an extension prefix
        // http://appium.io/docs/en/writing-running-appium/caps/
        // This is `appium:` for all Appium Capabilities which can be found here
        'appium:deviceName': 'ce11171b75456b0e04',//'Helen9',
        'appium:platformVersion': '9',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.resolve(__dirname, '../app/perchwell-staging-release-v4.7.5 (247).apk'),
        'appium:newCommandTimeout': 240,
        'appium:appWaitActivity': '*'
        // 'appium:noReset': true,
        // 'appium:appPackage': 'com.perchwell.re.staging',
    }
]

exports.config = config

