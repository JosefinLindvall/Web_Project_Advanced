const db = require('./db')

const accountManager = require('../../bll/account-manager')

exports.createAccount = function (account, hash, callback) {
    const query = "INSERT INTO Account (firstName, lastName, password, email, phoneNumber, birthDate, gender, flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    const values = [account.firstName, account.lastName, hash, account.email, account.phoneNumber, account.birthday, account.gender, "User"]

    db.query(query, values, function (error, account) {

        if (error) {
            callback(['databaseError'], null)
        }
        else {
            callback(null, account)
        }
    })
}


exports.logInAccount = function (account, callback) {

    const query = "SELECT password, typeOfUser FROM `Account` WHERE email = ?"
    const values = [account.email]

    db.query(query, values, function (databaseError, databasePassword, typeOfUser) {
            
        if (databaseError) { // This does not mean that no email was found, it means that we have an actual database error
            callback(['A database error occured when trying to log you in.'], null)
        }

        else if (password.length > 0) { // We have a match! An email was found that matched the users email.
            accountManager.comparePassword(account, databasePassword, typeOfUser) 
        }

        else { // No email found that matches the users email
            callback(['Invalid email!'], null)
        }
    })
}