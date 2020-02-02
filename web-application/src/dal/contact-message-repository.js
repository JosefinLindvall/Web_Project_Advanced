const db = require('./db')


/*
	Retrieves all contact messages ordered by time stamp.
	Possible errors: databaseError
	Success value: The fetched contact messages in an array.
*/
exports.getAllContactMessages = function (callback) {

    const query = `SELECT * FROM ContactMessage ORDER BY timeWhenSent ASC` //should it say ASC here?
    const values = []

    dbCursor.query(query, values, function (error, contactMessages) {

        if (error) {
            callback(['databaseError'], null) //this error from the database is passed forward as a hard coded string
        }

        else {
            callback([], contactMessages) //should i really return an empty arrray? Why not null? 
        }
    })

}