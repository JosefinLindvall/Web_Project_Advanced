const db = require('./db')

/////////////////////////////////////////////////////////////////////////////////////////////////////

exports.createPost = function (post, accountID, callback) {

	const query = "INSERT INTO Post (title, content, categoryID, locationID, accountID) VALUES (?, ?, ?, ?, ?)"
	const values = [post.title, post.content, post.category, post.location, accountID]

	db.query(query, values, function (error, post) {

		if (error) {
			console.log(error)
			callback(['databaseError'], null)
		}
		else {
			callback(null, post)
		}
	})
}



/////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getSixLatestPosts = function (callback) {

	const values = []
	const query = "SELECT * FROM posts ORDER BY timeWhenPosted LIMIT 6"

	db.query(query, values, function (databaseError, posts) {

		if (databaseError) {
			callback(['Databse error when fetching latest posts.'], null)
		}

		else {
			callback(null, posts)
		}
	})


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