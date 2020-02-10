const db = require('./db')

exports.createAccount = function (account, callback) {

    const query = "INSERT INTO Account (firstName, lastName, password, email, phoneNumber, birthDate, gender, flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    
    const keys = Object.keys(account)
    
    const {firstName, lastName, password, email, phoneNumber, birthday, gender} = account
    const values = [firstName, lastName, password, email, phoneNumber, birthday, gender, "User"]

    db.query(query, values, function (error, results) {

        if (error) {
            // TODO: Look for usernameUnique violation.
            callback(['databaseError'], null)
        }
        else {
            callback([], results.insertId)
        }
    })
}

exports.getAccountByEmail = function (email, callback) {

    const query = "SELECT * FROM Account where email = 'dennisfram@hotmail.com'"  //Detta borde ju hämta från den vi klickade på via search post på nått sätt sen eller? 

    const values = [email]

    db.query(query, values, function (error, accounts) {

        if (error) {
            callback(['databaseError'], null)
        }
        else {
            callback(null, accounts[0])
        }
    })
}