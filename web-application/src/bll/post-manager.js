const postRepository = require('../dal/post-repository')
const postValidator = require('./post-validator.js')


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.createPost = function (post, callback) {

    const errors = postValidator.getErrorsNewPost(post)

    if (errors.length > 0) {
        callback(errors, null)
        return
    }

    postRepository.createPost(post, callback)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getPostsByCategoryIdAndLocationId = function (categoryId, locationId, callback) {

    postRepository.getPostsByCategoryIdAndLocationId(categoryId, locationId, callback)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getSixLatestPosts = function (callback) {

    postRepository.getSixLatestPosts(callback)

}
