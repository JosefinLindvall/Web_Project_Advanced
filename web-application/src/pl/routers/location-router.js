const locationManager = require('../../bll/location-manager')

exports.getAllLocations = function (callback) {
    locationManager.getAllLocations(callback)
}