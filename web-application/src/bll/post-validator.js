

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