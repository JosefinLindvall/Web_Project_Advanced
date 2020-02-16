const db = require('./db')

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getAllCategories = function (callback) {

    const query = `SELECT * FROM Category ORDER BY category` 
    const values = []

    db.query(query, values, function (databaseError, categories) {

        if (databaseError) {
            callback(['Database error when fetching categories.'], null) 
        }

        else {
            callback(null, categories) 
        }
    })

}