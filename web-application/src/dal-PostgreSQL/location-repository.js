const db = require('./db')

module.exports = function({}){
    
    return {

        getAllLocations : function (callback) {

            Location.findall({
                order: [['location']]
            }).then (function(locations) {
                callback(null, locations)
            })
            .catch(function(error) {
                callback(error, null) 
            })
        }        
    }
}