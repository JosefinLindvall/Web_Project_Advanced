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


/////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getSpecificNrOfPosts = function (nrOfPosts, callback) {

	// db.query("SELECT * FROM posts 
	// WHERE timestamp = (SELECT MAX(timestamp) FROM sensorTable s2 WHERE s1.sensorID = s2.sensorID)
	// ORDER BY sensorID, timestamp;")
}


/////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getPostsByCategoryAndLocation = function (category, location, callback) {

	if (category == "any" && location == "any") {
		const query = `SELECT * FROM Post ORDER BY timeWhenSent ASC`
	}

	else if (category == "any") {
		const values = [location]
		const query = `SELECT * FROM Post WHERE location = ? ORDER BY timeWhenSent ASC`
	}

	else if (location == "any") {
		const values = [category]
		const query = `SELECT * FROM Post WHERE location = ? ORDER BY timeWhenSent ASC`
	}

	else {
		const values = [category, location]
		const query = `SELECT * FROM Post WHERE category = ? AND location = ? ORDER BY timeWhenSent ASC`
	}

	dbCursor.query(query, values, function (error, posts) {

		if (error) {
			callback(['databaseError'], null)
		}

		else {
			callback([], posts)
		}
	})

}