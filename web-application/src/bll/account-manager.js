const bcrypt = require('bcrypt')

module.exports = function ({ accountRepo, accountValidator }) {

    return {

        createAccount: function (account, callback) {
            
            const errors = accountValidator.getErrorsNewAccount(account)
            const password = account.password
            const saltRounds = 10

            if (errors.length > 0) {
                callback(errors, null)
                return
            }

            bcrypt.hash(password, saltRounds, function (err, hash) {
                accountRepo.createAccount(account, hash, callback)
            })
        },

        logInAccount: function (typedEmail, typedPassword, callback) {

            const errors = accountValidator.checkAccountInformation(typedEmail, typedPassword)

            if (errors.length > 0) {
                callback(errors, null)
                return
            }

            accountRepo.logInAccount(typedEmail, function (error, databasePassword, typeOfUser, accountID) {

                if (error) {
                    callback(error, null, null)
                }

                else {
                    comparePassword(typedPassword, databasePassword, typeOfUser, accountID, callback)
                }
            })
        },

        getUserInformation: function (accountID, callback) {
            accountRepo.getUserInformation(accountID, callback)
        },
    }
}

comparePassword = function (typedPassword, databasePassword, typeOfUser, accountID, callback) {

    bcrypt.compare(typedPassword, databasePassword, function (err, isMatch) {
        
        if (err) {
            callback(['Bcrypt error.'], null, null)
        }

        else if (isMatch == true) {
            callback(null, typeOfUser, accountID)
        }

        else {
            callback(['Invalid password!'], null, null)
        }
    });
}