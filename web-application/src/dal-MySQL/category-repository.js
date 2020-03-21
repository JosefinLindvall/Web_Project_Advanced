const db = require('./db')

module.exports = function({}) {
    
    return {

        getAllCategories : function (callback) {

            const query = `SELECT * FROM Category ORDER BY category` 
            const values = []

            db.query(query, values, function (databaseError, categories) {

                if (databaseError) {
                    callback(['Database error.'], null) 
                }

                else {
                    callback(null, categories) 
                }
            })
        }
    }    
}