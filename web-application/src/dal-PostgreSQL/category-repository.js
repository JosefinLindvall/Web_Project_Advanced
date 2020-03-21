const sequelize = require('./dbConnection')

getCategoryTable = function () { 
    return sequelize.model("category")
}

module.exports = function({}){
    
    return {

        getAllCategories : function (callback) {

            getCategoryTable().findAll({
                raw:true,
                order: [['category']]
            })
            
            .then (function(categories) {
                callback(null, categories)
            })
            
            .catch(function(error) {
                callback(error, null) 
            })
        }
    }    
}


