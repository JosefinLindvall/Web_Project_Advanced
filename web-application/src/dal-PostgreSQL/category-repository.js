module.exports = function({}){
    
    return {
        getAllCategories : function (callback) {

            Category.findall({
                order: [['category']]
            }).then (function(categories) {
                callback(null, categories)
            })
            .catch(function(error) {
                callback(error, null) 
            })
        }
    }    
}


