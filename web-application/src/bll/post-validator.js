
exports.getErrorsNewPost = function (post) {

    MAX_TITLE_LENGTH = 30
    MAX_CONTENT_LENGTH = 500

    errors = []
    title = post.title
    content = post.content
    category = post.category
    location = post.location

    if (title == "") {
        errors.push("Need to enter a title")
    }
    else if (title.length > MAX_TITLE_LENGTH) {
        errors.push("Title can't be more than 10 characters")
    }

    if (content == "") {
        errors.push("Need to enter some content")
    }
    else if (content.length > MAX_CONTENT_LENGTH) {
        errors.push("Content message can't be more than 500characters!")
    }

    return errors
}


//Vene vad detta är för skräp??
exports.getErrorsSearchPosts = function (category, location) {

    const validationErrors = []


    if (category == "") {
        errors.push("Must choose category")
    }

    if (category == "") {
        errors.push("Must choose location")
    }

    return errors
}