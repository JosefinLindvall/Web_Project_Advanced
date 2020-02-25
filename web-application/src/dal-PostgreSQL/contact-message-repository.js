
module.exports = function({}){
    
    return {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        getAllContactMessages : function (callback) {

            ContactMessages.findAll({
                order: [['timeWhenSent', 'DESC']]
            })
            
            .then (function(contactMessages) {
                callback([], contactMessages)
            })

            .catch(function(error) {
                callback(['Database error when fetching contact messages!'], null)
            })

            
        },


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        createContactMessage : function (title, content, email, callback) {

            contactMessage.create({title: title, content: content, email: email})
            
            .then (function(createdContactMessage){
                callback([])
            })

            .catch(function(error){
                callback(['Database error when creating contact message.'])
            })

        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}