const express = require('express')

module.exports = function({contactMessageManager, sessionHandler}) {
 
   const router = express.Router()
   
    router.get("/view-all-contact-messages", sessionHandler.checkIfLoggedInAsAdminUser, function (request, response) { 
    
        try {
            contactMessageManager.getAllContactMessages(function (databaseError, contactMessages) {
                    
                var model = {}

                if (databaseError) {
                    model = {
                        databaseError,
                        csrfToken: request.csrfToken()
                    }
                }

                else {
                    model = {
                        contactMessages,
                        csrfToken: request.csrfToken()
                    }
                }
                response.render("viewMessages.hbs", model)
            })
        }

        catch (error) { 

            const model = {
                routerError: error,
                csrfToken: request.csrfToken()
            }
            
            response.render("routerError.hbs", model)
        }
    })

    router.get("/support", function (request, response) {

        const model = {
            csrfToken: request.csrfToken()
          }

        response.render("support.hbs", model)
    })

    router.post("/send-contact-message", function (request, response) {

        const thankYouMessage = "Thank you for your message! We will get back to you as soon as possible!"
        const title = request.body.title
        const content = request.body.content
        const email = request.body.email

        try {
            contactMessageManager.createContactMessage(title, content, email, function (errors) {

                var model = {}
                
                if (errors.length) {
                    
                    model = {
                        title : title,
                        content : content,
                        email : email,
                        errors: errors, 
                        csrfToken: request.csrfToken()
                    }
                }

                else {
                    model = {
                        thankYouMessage: thankYouMessage, 
                        csrfToken: request.csrfToken()
                    }
                }
                response.render("support.hbs", model)
            })
        }

        catch (error) { 

            const model = {
                routerError: error,
                csrfToken: request.csrfToken()
            }
            response.render("routerError.hbs", model)
        }
    })
    return router
}