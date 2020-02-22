

module.exports = function({contactMessageRepo, contactMessageValidator}){
    
    return {

        /////////////////////////////////////////////////////////////////////////////////////////////

        getAllContactMessages : function (callback) {
            contactMessageRepo.getAllContactMessages(callback)
        },

        /////////////////////////////////////////////////////////////////////////////////////////////

        createContactMessage : function (title, content, email, callback) {

            const validationErrors = contactMessageValidator.getErrorsForCreateContactMessage(title, content, email)

            if (validationErrors.length > 0) {
                callback(validationErrors, null)
                return
            }

            else {
                contactMessageRepo.createContactMessage(title, content, email, callback)
            }

        }

        /////////////////////////////////////////////////////////////////////////////////////////////
    
    }
}