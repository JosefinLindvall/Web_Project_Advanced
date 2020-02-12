const accountRepository = require('../dal/account-repository')
const accountValidator = require('./account-validator')


exports.createAccount = function (account, callback) {

    const errors = accountValidator.getErrorsNewAccount(account)

    if (errors.length > 0) {
        callback(errors, null)
        return
    }

    accountRepository.createAccount(account, callback)
}


exports.logInAccount = function (account, callback) {

    const errors = accountValidator.checkAccountInformation(account)

    if (errors.length > 0) {
        callback(errors, null)
        return
    }

    accountRepository.logInAccount(account, callback)
}