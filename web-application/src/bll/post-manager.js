

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

        getSixLatestPosts: function (callback) {
            postRepo.getSixLatestPosts(callback)
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
}
