const express = require('express')

module.exports = function ({ postManager }) {

    const router = express.Router()

    router.get('/', function (request, response) {

        try {
            postManager.getSixLatestPosts(function (error, posts) {

                let model = {}

                if (error) {
                    model = {
                        error: error,
                        csrfToken: request.csrfToken()
                       
                    }
                    response.render("home.hbs", model)
                }

                else {
                    model = {
                        posts: posts, 
                        csrfToken: request.csrfToken()
                    }
                    response.render("home.hbs", model)
                }
            })
        }

        catch (error) {
            const model = {
                routerError: error
            }
            response.render("routerError.hbs", model)
        }
    })

    router.get('/about-us', function (request, response) {
        
        model = { 
            csrfToken: request.csrfToken()
        }
        
        response.render("about.hbs", model)
    })
    return router
}