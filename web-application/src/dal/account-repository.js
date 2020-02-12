const db = require('./db')

exports.createAccount = function (account, callback) {

    const query = "INSERT INTO Account (firstName, lastName, password, email, phoneNumber, birthDate, gender, flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    const values = [account.firstName, account.lastName, account.password, account.email, account.phoneNumber, account.birthday, account.gender, "User"]

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

    // Somehow match this user with a user from the database?? compare id only?

    db.query(query, values, function (error, account) {

        if (error) {
            callback(['databaseError'], null)
        }
        else {
            callback(null, account)
        }
    })
}