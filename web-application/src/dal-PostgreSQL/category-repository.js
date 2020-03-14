module.exports = function({db}){
    
    return {
        getAllCategories : function (callback) {

            db.getCategoryTable().findAll({
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


