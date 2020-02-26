const db = require('./db')

module.exports = function ({ }) {

    return {

        createAccount: function (account, hash, callback) {
            
            Account.create({
                firstName: account.firstName,
                lastName: account.lastName,
                password: hash,
                email: account.email,
                phoneNumber: account.phoneNumber,
                birthDate: account.birthday,
                gender: account.gender,
                typeOfUser: "User"
            
            }).then(function(account) {
                Account.findOne({
                    where: {email: account.email}
                
                }).then(function(account) {
                    callback(null, account.id)
                
                })
            }).catch(function(error) {
                callback(error, null)  
            })
        },

        logInAccount: function (typedEmail, callback) {

            //TODO
            // Account.findOne(function(){
            //     where: {}
        
            // })

            const query = "SELECT password, typeOfUser, accountID FROM `Account` WHERE email = ?"
            const values = [typedEmail]

            db.query(query, values, function (databaseError, dataPackage) {

                databasePassword = dataPackage[0].password
                typeOfUser = dataPackage[0].typeOfUser
                accountID = dataPackage[0].accountID

                if (databaseError) { // This does not mean that no email was found, it means that we have an actual database error
                    callback(['A database error occured when trying to log you in.'], null, null, null)
                }

                else if (databasePassword.length > 0) { // We have a match! An email was found that matched the users email.
                    callback(null, databasePassword, typeOfUser, accountID)
                }

                else { // No email found that matches the users email
                    callback(['Invalid email!'], null, null, null)
                }
            })
        },

        // TODO 
        getUserInformation: function (accountID, callback) {
            const query = "SELECT firstName, lastName, email, phoneNumber, birthDate, gender FROM `Account` WHERE accountID = ?"
            const values = [accountID]

            db.query(query, values, function (databaseError, currUserInfo) {
                if (databaseError) { 
                    callback(['A database error occured when trying to get the user in.'], null)
                }
                else {
                    callback(null, currUserInfo)
                }
            })
        }
    }
}
