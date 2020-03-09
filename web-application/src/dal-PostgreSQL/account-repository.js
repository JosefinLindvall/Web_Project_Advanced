
module.exports = function ({ db }) {

    return {

        createAccount: function (account, hash, callback) {

            db.getAccountTable().create({
                firstName: account.firstName,
                lastName: account.lastName,
                password: hash,
                email: account.email,
                phoneNumber: account.phoneNumber,
                birthDate: account.birthday,
                gender: account.gender,
                typeOfUser: "User"

            }).then(function (account) {
                db.getAccountTable().findOne({
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
            db.getAccountTable().findOne({
                where: { email: typedEmail }
            }).then(function (dataPackage) { 
                callback(null, dataPackage.password, dataPackage.typeOfUser, dataPackage.id) 
            }).catch(function (error) {
                callback(["Database error."], null, null, null)
            })
        },

        getUserInformation: function (accountID, callback) {
            db.getAccountTable().findByPk(
                accountID,
                {raw:true}
            ).then(function (currUserInfo) {
                callback(null, currUserInfo)
            }).catch(function (error) {
                callback(error, null)
            })
        }
    }
}
