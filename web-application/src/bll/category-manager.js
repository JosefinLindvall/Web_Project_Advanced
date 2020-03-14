
module.exports = function({categoryRepo}){
    
    return {
        getAllCategories : function (callback) {
            categoryRepo.getAllCategories(callback)
        }
    }
}