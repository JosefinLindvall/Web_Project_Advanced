
const sequelize = require('./dbConnection')

module.exports = function({}){
    
    return {

        getLocationTable : function () { 
            return sequelize.model("location")
        },

        getAllLocations : function (callback) {

            getLocationTable().findAll({
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