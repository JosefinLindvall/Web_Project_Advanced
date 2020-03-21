const sequelize = require('./dbConnection')


getPostTable = function () { 
	return sequelize.model("post")
}

module.exports = function ({}) {

	return {

		/////////////////////////////////////////////////////////////////////////////////////////////////////

		createPost: function (post, accountID, callback) {
		
			getPostTable().create({
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

		getPostByPostId: function (postID, callback) {
			
			getPostTable().findByPk(postID, {raw:true})
			
			.then(function (post) {
				console.log("post ", post)
                callback(null, post)
			})
			
			.catch(function (error) {
                callback(error, null)
            })
		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		getSixLatestPosts: function (callback) {
			
			getPostTable().findAll( { order: [['createdAt', 'DESC']], limit: 6, raw: true})
			
			.then(function(posts){
				callback(null, posts)
			})

			.catch(function() {
				callback(['Database error.'], null)
			})
		},


		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		getPostsByCategoryIdAndLocationId: function (categoryId, locationId, callback) {

			getPostTable().findAll({ 
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

			getPostTable().destroy({
				where: {postID: postId}
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

			getPostTable().update({
				title: updatedPost.title,
				content: updatedPost.content,
			}, {
				where: {postID: updatedPost.postID}
			})
			
			.then(function() {
				callback(null)
			})
			
			.catch(function(error) {
				console.log("db error", error)
				callback('Database error.')
			})
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////////
	}
}