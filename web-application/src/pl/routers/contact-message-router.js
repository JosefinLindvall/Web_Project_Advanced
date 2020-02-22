
const express = require('express')


module.exports = function({contactMessageManager, sessionHandler}) {
 
  
   const router = express.Router()

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    router.get("/view-all-contact-messages", sessionHandler.checkedIfLoggedInAsAdminUser, function (request, response) { 
    
        try {

            contactMessageManager.getAllContactMessages(function (databaseError, contactMessages) {
                
                const model = {
                    databaseError: databaseError,
                    contactMessages: contactMessages
                }

                response.render("viewMessages.hbs", model)
            })

        }


        catch (error) { // This error is a router error 

            const model = {
                routerError: error
            }

            response.render("routerError.hbs", model)

        }

    })

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    router.get("/support", function (request, response){

        response.render("support.hbs")
    })


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////


    router.post("/send-contact-message", function (request, response) {

        const thankYouMessage = "Thank you for your message! We will get back to you as soon as possible!"
        const title = request.body.title
        const content = request.body.content
        const email = request.body.email

        try {

            contactMessageManager.createContactMessage(title, content, email, function (errors) {

                var model = {}
                
                if (errors.length){
                    
                    model = {
                        title : title,
                        content : content,
                        email : email,
                        errors: errors
                    }
                }

                else{

                    model = {
                        thankYouMessage: thankYouMessage
                    }
                }

                response.render("support.hbs", model)
            })

        }


        catch (error) { // This error is a router error

            const model = {
                routerError: error
            }

            response.render("routerError.hbs", model)

        }
    })

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return router
}





