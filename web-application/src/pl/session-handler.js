exports.checkedIfLoggedInAsRegUser = function (request, response, next) {

    if (request.session.isLoggedInAsReg == null) {

        const model = {
            notLoggedInAsReg: true
        }

        response.render("login.hbs", model)
    }

    else {
        next()
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.checkedIfLoggedInAsAdminUser = function (request, response, next) {

    if (request.session.isLoggedInAsAdmin == null) {

        const model = {
            notLoggedInAsAdmin: true
        }

        response.render("login.hbs", model)
    }

    else {
        next()
    }


}