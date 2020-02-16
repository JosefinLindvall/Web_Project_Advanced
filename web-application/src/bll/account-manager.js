const accountRepository = require('../dal/account-repository')
const accountValidator = require('./account-validator')

const bcrypt = require('bcrypt')

exports.createAccount = function (account, callback) {
    const errors = accountValidator.getErrorsNewAccount(account)
    const password = account.password
    const saltRounds = 10


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

exports.comparePassword = function(account, databasePassword, typeOfUser) {
	
	bcrypt.compare(account.password, databasePassword[0].password, function (err, isMatch) {

		if (err) {
			callback(['bcrypt error'], null)
		}

		else if (isMatch == true) {
			callback(null, typeOfUser)
		}

		else {
			callback(['Invalid password!'], null)
		}
	});
}
