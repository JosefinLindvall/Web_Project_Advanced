const db = require('./db')
const bcrypt = require('bcrypt')

exports.createAccount = function (account, hash, callback) {
    const query = "INSERT INTO Account (firstName, lastName, password, email, phoneNumber, birthDate, gender, flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
<<<<<<< HEAD
    
    const keys = Object.keys(account)
    
    const {firstName, lastName, password, email, phoneNumber, birthday, gender} = account
    const values = [firstName, lastName, password, email, phoneNumber, birthday, gender, "User"]
=======
    const values = [account.firstName, account.lastName, hash, account.email, account.phoneNumber, account.birthday, account.gender, "User"]
>>>>>>> Denni_Branch

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
    

        // DU får ett kukigt object av databasen och du vill bara ha själva hash, inte password:sdsdsdsd
        // Now tommorrow you can move some of the implemenation to BLL instead.
        
        dataBasePassword = password
        dataBasePassword = dataBasePassword[0].password

        if (error) {
            callback(['databaseError'], null)
        }

        else if (password.length > 0) {
            bcrypt.compare(account.password, dataBasePassword, function (err, isMatch) {

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