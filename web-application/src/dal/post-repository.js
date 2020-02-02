const db = require('./db')

exports.createPost = function (post, callback) {

	const query = "INSERT INTO Post (title, email, content, category, location) VALUES (?, ?, ?, ?, ?)"
	const values = [post[0], post[1], post[2], post[3], post[4]]

	db.query(query, values, function (error, results) {

		if (error) {

			console.log(error)
			// TODO: Look for some violation maybe?.
			callback(['databaseError'], null)
		}
		else {
			callback(null, results.insertId)
		}
	})
}