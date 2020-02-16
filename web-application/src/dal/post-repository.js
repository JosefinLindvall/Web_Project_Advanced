const db = require('./db')

exports.createPost = function (post, callback) {

	const query = "INSERT INTO Post (title, content, categoryID, locationID) VALUES (?, ?, ?, ?)"
	const values = [post.title, post.content, post.category, post.location]

	db.query(query, values, function (error, post) {

		if (error) {
			callback(['databaseError'], null)
		}
		else {
			callback(null, post)
		}
	})
}


//vene vad som är tänkt här lul
/////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getSpecificNrOfPosts = function (nrOfPosts, callback) {

	// db.query("SELECT * FROM posts 
	// WHERE timestamp = (SELECT MAX(timestamp) FROM sensorTable s2 WHERE s1.sensorID = s2.sensorID)
	// ORDER BY sensorID, timestamp;")
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
//troligtvis inte min skit
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

	db.query(query, values, function (error, posts) {

		if (error) {
			callback(['databaseError'], null)
		}

		else {
			callback([], posts)
		}
	})

}