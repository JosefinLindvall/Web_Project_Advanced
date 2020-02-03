const accountRepository = require('../dal/account-repository')
const accountValidator = require('./account-validator')


exports.createAccount = function (account, callback) {

    // Validate the account.
    // const errors = accountValidator.getErrorsNewAccount(account)

    // if (errors.length > 0) {
    //     callback(errors, null)
    //     return
    // }
    accountRepository.createAccount(account, callback)
}

exports.getAccountByEmail = function (email, callback) {
    accountRepository.getAccountByEmail(email, callback)
}