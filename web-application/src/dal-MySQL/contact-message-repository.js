const db = require('./db')

module.exports = function({}){
    
    return {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        getAllContactMessages : function (callback) {

            const query = `SELECT * FROM ContactMessage ORDER BY timeWhenSent DESC` //should it say ASC here?
            const values = []

            db.query(query, values, function (error, contactMessages) {

                if (error) {
                    callback(['databaseError'], null) //this error from the database is passed forward as a hard coded string
                }

                else {
                    callback([], contactMessages) //should i really return an empty arrray? Why not null? 
                }
            })

        },


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        createContactMessage : function (title, content, email, callback) {

            const query = `INSERT INTO ContactMessage (title, content, email) VALUES (?,?,?)`
            const values = [title, content, email]

            db.query(query, values, function (error) {

                if (error) {
                    callback(['databaseError']) //this error from the database is passed forward as a hard coded string
                }

                else {
                    callback([]) //should i really return an empty arrray? Why not null? 
                }
            })

        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}