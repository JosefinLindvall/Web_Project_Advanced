const db = require('./db')

module.exports = function({}){
    
    return {

        getAllContactMessages : function (callback) {

            const query = `SELECT * FROM ContactMessage ORDER BY createdAt DESC`
            const values = []

            db.query(query, values, function (error, contactMessages) {

                if (error) {
                    callback(['Database error.'], null)
                }

                else {
                    callback(null, contactMessages) 
                }
            })

        },

        createContactMessage : function (title, content, email, callback) {

            const query = `INSERT INTO ContactMessage (title, content, email) VALUES (?,?,?)`
            const values = [title, content, email]

            db.query(query, values, function (error) {

                if (error) {
                    callback(['Database error.'])
                }

                else {
                    callback([])  
                }
            })

        }
    }
}