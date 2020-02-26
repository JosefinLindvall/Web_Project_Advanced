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

            }).then(function (account) {
                Account.findOne({
                    where: { email: account.email }
                }).then(function (account) {
                    callback(null, account.id)
                })
            }).catch(function (error) {
                callback(error, null)
            })
        },

        //dubbelkolla hur detta kommer bli för vi parsar ju objektet och stoppar in fler parameterar 
        logInAccount: function (typedEmail, callback) {
            Account.findOne({
                where: { email: typedEmail }
            }).then(function (dataPackage) {
                callback(null, dataPackage)
            }).catch(function (error) {
                callback(error, null)
            })
        },

        getUserInformation: function (accountID, callback) {
            Account.findById(accountID).then(function (currUserInfo) {
                callback(null, currUserInfo)
            }).catch(function (error) {
                callback(error, null)
            })
        }
    }
}
