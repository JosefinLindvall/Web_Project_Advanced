const db = require('./db')

exports.createPost = function(post, callback) {

    const query = "INSERT INTO Post (title, email, content) VALUES (?, ?, ?)"
    const values = [post[0], post[1], post[2]]

	db.query(query, values, function(error, results) {
        
        if(error) {
			// TODO: Look for some violation maybe?.
			callback(['databaseError'], null)
        }
        else {
			callback(null, results.insertId)
		}
	})
}