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

exports.getPostsByCategoryIdAndLocationId = function (categoryId, locationId, callback) {

	const values = [categoryId, locationId]
	const query = `SELECT * FROM Post WHERE categoryID = ? AND locationID = ?`
	

	db.query(query, values, function (databaseError, posts) {

		if (databaseError) {
			callback(['Databse error when fetching matching posts.'], null)
		}

		else {
			callback(null, posts)
		}
	})

}