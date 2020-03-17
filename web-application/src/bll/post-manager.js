

module.exports = function ({ postRepo, postValidator }) {

    return {
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        createPost: function (post, accountID, callback) {

            const errors = postValidator.getErrorsNewPost(post)

            if (errors.length > 0) {
                callback(errors, null)
                return
            }
            postRepo.createPost(post, accountID, callback)
        },

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getPostsByCategoryIdAndLocationId: function (categoryId, locationId, callback) {
            postRepo.getPostsByCategoryIdAndLocationId(categoryId, locationId, callback)
        },

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        getPostByPostId: function(postID, callback) {
            postRepo.getPostByPostId(postID, callback)
        },


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        getSixLatestPosts: function (callback) {
            postRepo.getSixLatestPosts(callback)
        },

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        deletePost: function (postId, callback) {
            postRepo.deletePost(postId, callback)
        },

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        updatePost: function (updatedPost, typeOfUser, callback) {

            const errors = postValidator.validateUserAsAdmin(typeOfUser)

            if (errors.length > 0) {
                callback(errors, null)
                return
            }
            postRepo.updatePost(updatedPost, callback)
        }
    }
}
