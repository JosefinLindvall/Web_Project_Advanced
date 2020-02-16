
const locationRepository = require('../dal/location-repository')


exports.getAllLocations = function (callback) {
    
    locationRepository.getAllLocations(callback)
}

