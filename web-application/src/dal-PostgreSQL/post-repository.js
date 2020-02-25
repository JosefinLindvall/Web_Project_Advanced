

module.exports = function ({ }) {

	return {

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		createPost: function (post, accountID, callback) {


			Post.create({title: post.title, content: post.content, categoryID: post.category, locationID: post.location, accountID: accountID})
			
			.then(function(){
				callback(null)
			})

			.catch(function(error){
				callback(['Database error when creating post.'])
			})


		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		getSixLatestPosts: function (callback) {

			Post.findAll( { order: [['timeWhenPosted', 'DESC']], limit: 6})
			.then(function(posts){
				callback(null, posts)
			})

			.catch(function(error){
				callback(['Database error when fetching latest posts.'], null)
			})
			
		
		},


		/////////////////////////////////////////////////////////////////////////////////////////////////////
		
		getPostsByCategoryIdAndLocationId: function (categoryId, locationId, callback) {

			Post.findAll( { where: {categoryID : categoryId, locationID: locationId}, order: [['timeWhenPosted', 'DESC']]})
			.then(function(posts){
				callback(null, posts)
			})

			.catch(function(error){
				callback(['Database error when fetching matching posts.'], null)
			})

		}
	}
}