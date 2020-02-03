const db = require('./db')

exports.createAccount = function (account, callback) {

    const query = "INSERT INTO Account (firstName, lastName, password, email, phoneNumber, birthDate, gender, flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    const values = [account[0], account[1], account[2], account[3], account[4], account[5], account[6], "User"]

	console.log(values)

    db.query(query, values, function (error, results) {

        if (error) {
            // TODO: Look for usernameUnique violation.
            callback(['databaseError'], null)
        }
        else {
            callback(null, results.insertId)
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