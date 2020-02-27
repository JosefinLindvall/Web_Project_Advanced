const db = require('./db')

module.exports = function ({ }) {

    return {

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        createAccount: function (account, hash, callback) {

            //Inserting the account
            const query = "INSERT INTO Account (firstName, lastName, password, email, phoneNumber, birthDate, gender, typeOfUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            const values = [account.firstName, account.lastName, hash, account.email, account.phoneNumber, account.birthday, account.gender, "User"]

            db.query(query, values, function (error, account) {

                if (error) {
                    callback(['Database error!'], null) //Database error when inserting account
                }

                else {

                    //Fetching id for the account that was just inserted
                    const query = "SELECT accountID FROM `Account` WHERE email = ?"
                    const values = [account.email]

                    db.query(query, values, function (error, accountID) {

                        if (error) {
                            callback(['Database error!'], null)
                        }

                        else {
                            callback(null, accountID)
                        }

                    })
                }
            })
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        logInAccount: function (typedEmail, callback) {

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

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        getUserInformation: function (accountID, callback) {
            const query = "SELECT firstName, lastName, email, phoneNumber, birthDate, gender FROM `Account` WHERE accountID = ?"
            const values = [accountID]

            db.query(query, values, function (databaseError, currUserInfo) {
                if (databaseError) { // This does not mean that no email was found, it means that we have an actual database error
                    callback(['A database error occured when trying to get the user in.'], null)
                }
                else {
                    callback(null, currUserInfo)
                }
            })
        }
    }
}