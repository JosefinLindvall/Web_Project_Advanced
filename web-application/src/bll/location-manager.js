
const locationRepository = require('../dal/location-repository')

//location-validator for something?

exports.getAllLocations = function (callback) {
    // Validate something here ?? 
    locationRepository.getAllLocations(callback)
}

