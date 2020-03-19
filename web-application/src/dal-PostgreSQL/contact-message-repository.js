const sequelize = require('./dbConnection')

module.exports = function({}){
    
    return {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        getContactMessageTable : function () { 
            return sequelize.model("contactMessage")
        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        getAllContactMessages : function (callback) {

            getContactMessageTable().findAll({
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