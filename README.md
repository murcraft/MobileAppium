# MobileAppium

The project is based on:
* WebdriverIO: 6.##.#
* Appium: 1.15.#


## Installing Appium on a local machine

To setup the local test environment the following needs to be installed:
- [appium-doctor](https://github.com/appium/appium-doctor) with npm install `appium-doctor -g`
- [Appium](https://github.com/appium/appium) with `npm install appium -g`
- [appium-desktop](https://github.com/appium/appium-desktop). It gives us the ability of the Appium automation server in a UI. 

## Setting up Android
To setup your local machine to use an Android emulator:
1. [Setup Android Studio](https://developer.android.com/studio/)
2. Follow the instructions to download and setup Android studio and configure a your emulators with [this tutorial](https://developer.android.com/studio/run/managing-avds).


## Run tests

See [configs](https://github.com/murcraft/MobileAppium/tree/master/config) that are based on `wdio.shared.conf.js`. This shared config holds all the defaults so the Android config only need to hold the capabilities and specs that are needed for running on Android.

Appium is configured in `wdio.shared.conf.js` to use the global Appium installation.

The next environments may be used:
 * **logLevel** ( ***info*** | debug|error ) - debug level
 * **spec** ( ***** | smoke*** ) - spec name, all specs are run by default.
 * **platform** ( ***android*** ) - using platform for running tests
 * **env** ( ***staging*** | dev ) - application environment

**To run tests follow the next steps:**
1. Install project packages from project root: 

> `npm install`

2. Start emulator [manually](https://developer.android.com/studio/run/managing-avds) or using command: 

> `emulator:run`.

>> NOTE: using command you should set the name of you created emulator.

3. Run tests: 

> `npm run android:test`

or with environment:

 > `npm run android:test --logLevel=debug`
    
    
This project only handles local execution on 1 em/simulator at a time, not parallel execution.
