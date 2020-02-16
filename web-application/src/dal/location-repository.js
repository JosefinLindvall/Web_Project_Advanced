const db = require('./db')

exports.getAllLocations = function (callback) {

    const query = "SELECT * FROM Location"
    const values = []

    db.query(query, values, function (error, location) {

        if (error) {
            callback(['databaseError'], null)
        }
        else {
            callback(null, location)
        }
    })
}

