const sequelize = require('./dbConnection')

getContactMessageTable = function () { 
    return sequelize.model("contactMessage")
}


module.exports = function({}){
    
    return {

        
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        getAllContactMessages : function (callback) {

            getContactMessageTable().findAll({
                order: [['createdAt', 'DESC']], raw: true
            })
            
            .then (function(contactMessages) {
                callback(null, contactMessages)
            })

            .catch(function(error) {
                callback(['Database error.'], null)
            })    
        },


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        createContactMessage : function (title, content, email, callback) {

            getContactMessageTable().create({title: title, content: content, email: email})
            
            .then(function(createdContactMessage) {
                callback([])
            })

            .catch(function(error) {
                callback(error) //['Database error when creating contact message.']
            })
        }
    }
}