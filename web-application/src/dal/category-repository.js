const db = require('./db')

<<<<<<< HEAD
exports.getAllContactMessages = function (callback) {


}
=======
exports.getAllCategories = function (callback) {

    const query = "SELECT * FROM Category"
    const values = []

    db.query(query, values, function (error, category) {

        if (error) {
            callback(['databaseError'], null)
        }
        else {
            callback(null, category)
        }
    })
}
>>>>>>> Denni_Branch
