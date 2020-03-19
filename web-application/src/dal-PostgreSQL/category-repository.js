const sequelize = require('./dbConnection')

module.exports = function({}){
    
    return {

        getCategoryTable : function () { 
            return sequelize.model("category")
        },
        
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


