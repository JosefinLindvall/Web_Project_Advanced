const db = require('./db')

module.exports = function({}){
    
    return {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        getAllContactMessages : function (callback) {

            const query = `SELECT * FROM ContactMessage ORDER BY createdAt DESC`
            const values = []

            db.query(query, values, function (error, contactMessages) {

                if (error) {
                    callback(['Database error.'], null) //this error from the database is passed forward as a hard coded string
                }

                else {
                    callback(null, contactMessages) 
                }
            })

        },


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        createContactMessage : function (title, content, email, callback) {

            const query = `INSERT INTO ContactMessage (title, content, email) VALUES (?,?,?)`
            const values = [title, content, email]

            db.query(query, values, function (error) {

                if (error) {
                    callback(['Database error.']) //this error from the database is passed forward as a hard coded string
                }

                else {
                    callback([])  
                }
            })

        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}