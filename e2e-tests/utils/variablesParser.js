'use strict'

class VariablesParser {

  static GetParamValue (param) {
    let value = undefined
    let npmArgs = process.argv
    let arg = npmArgs.filter(value => {
      return value.includes(param)
    })
    if (arg.length > 0) {
      value = arg[0].substr(arg[0].indexOf('=') + 1)
    }
    return value
  }

  static ParseVariables (envVariable) {
    let cmdValue = VariablesParser.GetParamValue(envVariable)
    switch (envVariable) {
      case 'env':
        process.env.env = cmdValue !== undefined ? cmdValue : process.env.env
        process.env.env = process.env.env !== 'undefined' ? process.env.env : 'staging'
        console.log(`env - ${process.env.env}`)
        return process.env.env
      case 'platform':
        process.env.platform = cmdValue !== undefined ? cmdValue : process.env.platform
        process.env.platform = process.env.platform !== 'undefined' ? process.env.platform : 'android'
        console.log(`platform - ${process.env.platform}`)
        return process.env.platform
      case 'logLevel':
        process.env.logLevel = cmdValue !== undefined ? cmdValue : process.env.logLevel
        process.env.logLevel = process.env.logLevel !== 'undefined' ? process.env.logLevel : 'info'
        console.log(`logLevel - ${process.env.logLevel}`)
        return process.env.logLevel
      case 'isCleanAllure':
        process.env.isCleanAllure = cmdValue !== undefined ? cmdValue : process.env.isCleanAllure
        process.env.isCleanAllure = process.env.isCleanAllure !== 'undefined' ? process.env.isCleanAllure : 'false'
        console.log(`isCleanAllure - ${process.env.isCleanAllure}`)
        return process.env.isCleanAllure
      case 'spec':
        process.env.spec = cmdValue !== undefined ? cmdValue : process.env.spec
        process.env.spec = process.env.spec !== 'undefined' ? process.env.spec : 'smoke'
        console.log(`spec - ${process.env.spec}`)
        return process.env.spec
    }
  }
}

module.exports = VariablesParser