const VariablesParser = require ('./e2e-tests/utils/variablesParser')
const path = require('path')

module.exports = {
  env: VariablesParser.ParseVariables('env'),
  logLevel: VariablesParser.ParseVariables('logLevel'),
  isCleanAllure: VariablesParser.ParseVariables('isCleanAllure'),
  spec: VariablesParser.ParseVariables('spec'),

  mailtrap: {
    apiToken: '5a04372410fa0e29aa08c5481866e740',
    inboxIdStage: '239589'
  }
}