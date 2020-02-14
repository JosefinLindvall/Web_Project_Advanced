const db = require('./db')
const bcrypt = require('bcrypt')

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

    const query = "SELECT password FROM `Account` WHERE email = ?"
    const values = [account.email]

    db.query(query, values, function (error, password) {

        if (error) {
            callback(['databaseError'], null)
        }

        else if (password.length > 0) {
            bcrypt.compare(account.password.toString, password.toString(), function (err, isMatch) {

                if (err) {
                    callback(['bcrypt error'], null)
                }

                else if (isMatch == true) {
                    callback(null)
                }

                else {
                    callback(['invalid password'], null)
                }
            });
        }

        else {
            callback(['invalid email'], null)
        }
    })
}