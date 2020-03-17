
module.exports = function({db}){
    
    return {

        getAllLocations : function (callback) {

            db.getLocationTable().findAll({
                order: [['location']],
                raw:true
            })
            
            .then (function(locations) {
                callback(null, locations)
            })
            
            .catch(function(error) {
                callback(error, null) 
            })
        }        
    }
}