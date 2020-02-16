const accountRepository = require('../dal/account-repository')
const accountValidator = require('./account-validator')

const bcrypt = require('bcrypt')

exports.createAccount = function (account, callback) {
    const errors = accountValidator.getErrorsNewAccount(account)
    const password = account.password.toString()
    const saltRounds = 10

    console.log(typeof(password))

    if (errors.length > 0) {
        callback(errors, null)
        return
    }

    // have some error validations maybe? 
    bcrypt.hash(password, saltRounds, function (err, hash) {
        accountRepository.createAccount(account, hash, callback)
    })
}


exports.logInAccount = function (account, callback) {

    // const errors = accountValidator.checkAccountInformation(account)

    // if (errors.length > 0) {
    //     callback(errors, null)
    //     return
    // }

    accountRepository.logInAccount(account, callback)
}