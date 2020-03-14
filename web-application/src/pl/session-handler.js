module.exports = function ({ }) {

    return {
//ändra så de står check
        checkedIfLoggedInAsRegUser: function (request, response, next) {

            if (request.session.isLoggedInAsReg == null) {

                const model = {
                    notLoggedInAsReg: true
                }

                response.render("login.hbs", model)
            }

            else {
                next()
            }
        },


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        checkedIfLoggedInAsAdminUser: function (request, response, next) {

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
    }
}