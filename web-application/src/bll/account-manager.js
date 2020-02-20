const accountRepository = require('../dal/account-repository')
const accountValidator = require('./account-validator')

const bcrypt = require('bcrypt')

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.logInAccount = function (typedEmail, typedPassword, callback) {

    // const errors = accountValidator.checkAccountInformation(account)

    // if (errors.length > 0) {
    //     callback(errors, null)
    //     return
    // }

    accountRepository.logInAccount(typedEmail,  function(error,  databasePassword, typeOfUser, accountID){
        
        if (error) {
            callback(error, null, null)
        }

        else {
            comparePassword(typedPassword, databasePassword, typeOfUser, accountID, callback)
        }      
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

comparePassword = function(typedPassword, databasePassword, typeOfUser, accountID, callback) {
    
	bcrypt.compare(typedPassword, databasePassword, function (err, isMatch) {

		if (err) {
			callback(['bcrypt error'], null, null)
		}

		else if (isMatch == true) {
			callback(null, typeOfUser, accountID)
		}

		else {
			callback(['Invalid password!'], null, null)
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
