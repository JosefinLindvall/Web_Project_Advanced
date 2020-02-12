const express = require('express')
const contactMessageManager = require('../../bll/contact-message-manager')

const router = express.Router()


////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/", function (request, response) {

    try {

        const contactMessages = contactMessageManager.getAllContactMessages(function (databaseError, contactMessages) {

            const model = {
                databaseError: databaseError,
                contactMessages: contactMessages
            }

            response.render("viewMessages.hbs", model)
        })

    }


    catch (error) { //could this be renamed to "routerError"?

        const model = {
            routerError: error
        }

        response.render("routerError.hbs", model)

    }

})


////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/send-contact-message", function (request, response) {

    const thankYouMessage = "Thank you for your message! We will come back to you as soon as possible!"

    try {

        contactMessageManager.createContactMessage(function (databaseError) {

            const model = {
                errors: errors, //these errors are either database errors or validation errors...
                thankYouMessage: thankYouMessage
            }

            response.render("support.hbs", model)
        })

    }


    catch (error) { //could this be renamed to "routerError"?

        const model = {
            routerError: error
        }

        response.render("routerError.hbs", model)

    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router