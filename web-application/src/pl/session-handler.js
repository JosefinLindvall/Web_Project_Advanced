module.exports = function ({ }) {

    return {

        checkIfLoggedInAsRegUser: function (request, response, next) {

            if (request.session.isLoggedInAsReg == null) {

                const model = {
                    notLoggedInAsReg: true,
                    csrfToken: request.csrfToken()
                }

                response.render("login.hbs", model)
            }

            else {
                next()
            }
        },


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        checkIfLoggedInAsAdminUser: function (request, response, next) {

            if (request.session.isLoggedInAsAdmin == null) {

                const model = {
                    notLoggedInAsAdmin: true, 
                    csrfToken: request.csrfToken()
                }

                response.render("login.hbs", model)
            }

            else {
                next()
            }
        }
    }
}