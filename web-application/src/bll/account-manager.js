const accountRepository = require('../dal/account-repository')
// const accountValidator = require('./account-validator')  gör en ny fil för validering senare


exports.createAccount = function(account, callback) {

    //validate account here later by calling accountValidator function
    
    accountRepository.createAccount(account, callback)
}
