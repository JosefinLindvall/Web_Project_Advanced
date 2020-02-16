const db = require('./db')

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
