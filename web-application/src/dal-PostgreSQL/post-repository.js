
module.exports = function ({db}) {

	return {

		createPost: function (post, accountID, callback) {
		
			db.getPostTable().create({
				title: post.title, 
				content: post.content, 
				categoryID: post.categoryID, 
				locationID: post.locationID, 
				accountID: accountID 
			})
			
			.then(function() {
				callback(null)
			})
			
			.catch(function(error) {
				callback(error)
			})
		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		getSixLatestPosts: function (callback) {
			
			db.getPostTable().findAll( { order: [['createdAt', 'DESC']], limit: 6, raw: true})
			
			.then(function(posts) {
				callback(null, posts)
			})

			.catch(function() {
				callback(['Database error.'], null)
			})
		},


		/////////////////////////////////////////////////////////////////////////////////////////////////////
		getPostsByCategoryIdAndLocationId: function (categoryId, locationId, callback) {

			db.getPostTable().findAll({ 
				where: {
					categoryID : categoryId, 
					locationID: locationId
				}, 
				order: [['createdAt', 'DESC']], 
				raw: true
			})
			
			.then(function(posts){
				callback(null, posts)
			})

			.catch(function(){
				callback(['Database error.'], null)
			})

		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		deletePost: function (postId, callback) {

			db.getPostTable().destroy({
				where: {id: postId}
			})
			
			.then(function() {
				callback(null)
			})
			
			.catch(function() {
				callback('Database error.')
			})
		},
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////

		updatePost: function (updatedPost, callback) {

			db.getPostTable().update({
				title: updatedPost.title,
				content: updatedPost.content,
			}, {
				where: {id: updatedPost.postID}
			})
			
			.then(function() {
				callback(null)
			})
			
			.catch(function() {
				callback('Database error.')
			})
		}
	}
}