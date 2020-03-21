const db = require('./db')

module.exports = function({}){
    
    return {
        
        getAllLocations : function (callback) {

            const query = `SELECT * FROM Location ORDER BY location` 
            const values = []

            db.query(query, values, function (databaseError, locations) {

                if (databaseError) {
                    callback(['Database error.'], null) 
                }

                else {
                    callback(null, locations) 
                }
            })
        }
    }
}