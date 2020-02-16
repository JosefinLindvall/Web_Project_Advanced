const postRepository = require('../dal/post-repository')
const postValidator = require('./post-validator.js')

exports.createPost = function (post, callback) {

    const errors = postValidator.getErrorsNewPost(post)

    if (errors.length > 0) {
        callback(errors, null)
        return
    }

    postRepository.createPost(post, callback)
}

exports.getPostsByCategoryAndLocation = function (category, location, callback) {

    const validationErrors = postValidator.getErrorsForSearchPosts(category, location)

    if (validationErrors.length > 0) {
        callback(validationErrors, null)
        return
    }

    else {
        postRepository.getPostsByCategoryAndLocation(category, location, callback)
    }
}