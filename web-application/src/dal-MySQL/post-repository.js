const db = require('./db')

module.exports = function ({ }) {

	return {

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		createPost: function (post, accountID, callback) {

			const query = "INSERT INTO Post (title, content, categoryID, locationID, accountID) VALUES (?, ?, ?, ?, ?)"
			const values = [post.title, post.content, post.categoryID, post.locationID, accountID]

			db.query(query, values, function (error) {

				if (error) {
					callback(['databaseError'])
				}
				else {
					callback(null)
				}
			})
		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		getSixLatestPosts: function (callback) {

			const values = []
			const query = "SELECT * FROM Post ORDER BY createdAt ASC LIMIT 6"

			db.query(query, values, function (databaseError, posts) {
				if (databaseError) {
					callback(['Databse error when fetching latest posts.'], null)
				}

				else {
					callback(null, posts)
				}
			})
		},


		/////////////////////////////////////////////////////////////////////////////////////////////////////
		getPostsByCategoryIdAndLocationId: function (categoryId, locationId, callback) {

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
	}
}