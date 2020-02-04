const accountRepository = require('../dal/post-repository')
const postValidator = require('./post-validator.js')

exports.createPost = function (post, callback) {
    //validate post here later by calling some form of Validator function or do it inside here?
    accountRepository.createPost(post, callback)
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

