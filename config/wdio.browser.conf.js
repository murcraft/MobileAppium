const {config} = require('./wdio.shared.conf')

config.capabilities = [
    {
        platformName: 'Android',
        browserName: 'Chrome',
        maxInstances: 1,
        // For W3C the appium capabilities need to have an extension prefix
        // http://appium.io/docs/en/writing-running-appium/caps/
        // This is `appium:` for all Appium Capabilities which can be found here
        'appium:deviceName': 'Helen9',
        'appium:platformVersion': '9',
        'appium:orientation': 'PORTRAIT',
        'appium:automationName': 'UiAutomator2',
        'appium:newCommandTimeout': 240,
        'goog:chromeOptions': {
            w3c: true,
            // Add this option to prevent the annoying "Welcome"-message
            args: [ '--no-first-run' ],
        }
    }
]

exports.config = config

