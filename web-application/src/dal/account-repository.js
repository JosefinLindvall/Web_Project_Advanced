const db = require('./db')

//Hör med Josefin hur vi ska göra med flaggan vid varje insert här
//Kolla även med någon om man bör göra på detta sättet med account till values

exports.createAccount = function(account, callback) {

    const query = "INSERT INTO Account (firstName, lastName, password, email, phoneNumber, birthDate, gender) VALUES (?, ?, ?, ?, ?, ?, ?)"
    const values = [account[0], account[1], account[2], account[3], account[4], account[5], account[6]]

    console.log(account)

	db.query(query, values, function(error, results) {
        
        if(error) {
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
        }
        else {
			callback(null, results.insertId)
		}
	})
}