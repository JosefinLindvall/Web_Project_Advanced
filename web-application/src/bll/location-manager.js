

module.exports = function({locationRepo}){
    
    return {

        getAllLocations : function (callback) {
    
            locationRepo.getAllLocations(callback)
        }
    
    }
}

