const accountRepository = require('../dal/post-repository')

exports.createPost = function (post, callback) {

    //validate post here later by calling some form of Validator function or do it inside here?
    accountRepository.createPost(post, callback)
}
