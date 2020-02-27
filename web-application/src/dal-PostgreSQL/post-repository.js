//const sequelize = require('./db')
//const db = require('./db')

module.exports = function ({db}) {

	return {

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		createPost: function (post, accountID, callback) {

			db.getPostTable().create({
				title: post.title, 
				content: post.content, 
				categoryID: post.category, 
				locationID: post.location, 
				accountID: accountID 
			}).then(function() {
				callback(null)
			}).catch(function(error){
				callback(error)
			})
		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		getSixLatestPosts: function (callback) {
			
			db.getPostTable().findAll( { order: [['timeWhenPosted', 'DESC']], limit: 6, raw: true})
			.then(function(posts){
				callback(null, posts)
			})

			.catch(function(error){
				callback(['Database error when fetching latest posts.'], null)
			})
			
		
		},


		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		getPostsByCategoryIdAndLocationId: function (categoryId, locationId, callback) {

			db.getPostTable().findAll( { where: {categoryID : categoryId, locationID: locationId}, order: [['timeWhenPosted', 'DESC']], raw: true})
			.then(function(posts){
				callback(null, posts)
			})

			.catch(function(error){
				callback(error, null) //['Database error when fetching matching posts.']
			})

		}
	}
}