const path  = require('path')
const {config} = require('./wdio.shared.conf')

config.specs = [
    './e2e-tests/specs/**/*.js'
]

config.capabilities = [
    {
        platformName: 'Android',
        maxInstances: 1,
        'appium:deviceName': 'Helen9',
        'appium:platformVersion': '9',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.resolve(__dirname, '../app/perchwell-staging-release-v4.8.3(272).apk'),
        'appium:newCommandTimeout': 240,
        'appium:appWaitActivity': '*',
        'appium:noReset': false,
    }
]

exports.config = config

