exports.config = {
    runner: 'local',
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 90000,
    },
    sync: true,
    logLevel: 'debug',
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
}
