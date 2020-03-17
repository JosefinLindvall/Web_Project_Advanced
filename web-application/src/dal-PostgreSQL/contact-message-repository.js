
module.exports = function({db}){
    
    return {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getAllContactMessages : function (callback) {

            db.getContactMessageTable().findAll({
                order: [['createdAt', 'DESC']], raw: true
            })
            
            .then (function(contactMessages) {
                callback([], contactMessages)
            })

            .catch(function(error) {
                callback(['Database error.'], null)
            })    
        },


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        createContactMessage : function (title, content, email, callback) {

            db.getContactMessageTable().create({title: title, content: content, email: email})
            
            .then(function(createdContactMessage) {
                callback([])
            })

            .catch(function(error) {
                callback(error) //['Database error when creating contact message.']
            })
        }
    }
}