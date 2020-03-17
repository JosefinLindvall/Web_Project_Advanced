const db = require('./db')

module.exports = function ({ }) {

	return {

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		createPost: function (post, accountID, callback) {

			const query = "INSERT INTO Post (title, content, categoryID, locationID, accountID) VALUES (?, ?, ?, ?, ?)"
			const values = [post.title, post.content, post.categoryID, post.locationID, accountID]

			db.query(query, values, function (error) {

				if (error) {
					callback(['Database error.'])
				}
				else {
					callback(null)
				}
			})
		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////

		getPostByPostId: function (postID, callback) {

			const values = [postID]
			const query = "SELECT * FROM Post WHERE postID = ?"

			db.query (query, values, function(databaseError, post){

				if (databaseError) {
					console.log(databaseError)
					callback(['Database error.'], null)
				}

				else {
					callback(null, post)
				}

			})


		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		getSixLatestPosts: function (callback) {

			const values = []
			const query = "SELECT * FROM Post ORDER BY createdAt ASC LIMIT 6"

			db.query(query, values, function (databaseError, posts) {
				if (databaseError) {
					callback(['Database error.'], null)
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
					callback(['Database error.'], null)
				}

				else {
					callback(null, posts)
				}
			})
		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////

		deletePost: function (postId, callback) {
			const values = [postId]
			const query = "DELETE FROM Post WHERE postID = ?"

			db.query(query, values, function(databaseError) {
				
				if (databaseError) {
					callback(['Database error.'])
				}

				else {
					callback(null)
				}
			})
		},
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////

		updatePost: function (updatedPost, callback) {
			
			const values = [updatedPost.title, updatedPost.content, updatedPost.postID]
			const query = "UPDATE Post SET title = ?, content = ? WHERE postID = ?"

			db.query(query, values, function(databaseError) {
				
				if (databaseError) {
					callback(['Databse error.'])
				}

				else {
					callback(null)
				}
			})
		}
		/////////////////////////////////////////////////////////////////////////////////////////////////////
	}

}