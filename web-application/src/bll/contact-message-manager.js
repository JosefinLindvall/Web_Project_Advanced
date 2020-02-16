const contactMessageRepository = require('../dal/contact-message-repository')
const contactMessageValidator = require('./contact-message-validator.js')

exports.getAllContactMessages = function (callback) {
    contactMessageRepository.getAllContactMessages(callback)
}

exports.createContactMessage = function (title, content, email, callback) {

    const validationErrors = contactMessageValidator.getErrorsForCreateContactMessage(title, content, email)

    if (validationErrors.length > 0) {
        callback(validationErrors, null)
        return
    }

    else {
        contactMessageRepository.createContactMessage(title, content, email, callback)
    }

}