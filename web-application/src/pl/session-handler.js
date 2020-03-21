module.exports = function ({ }) {

    return {

        checkIfLoggedInAsRegUser: function (request, response, next) {

            if (request.session.isLoggedInAsReg == false) {

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

            if (request.session.isLoggedInAsAdmin == false ) {

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