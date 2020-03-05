const express = require('express')

module.exports = function ({locationManager}) {

    const router = express.Router()
 
	router.get('/locations', function (request, response) {
	
		locationManager.getAllLocations(function (errors, locations) {

			if (errors != null) {
                
                if (errors.includes("Database error.")) { 
					response.status(500).end()
				}
                
                else { //These errors are validation errors!
					response.status(400).json(errors)
				}
			}
			else {	
				response.status(200).json({locations: locations}) //do we need to pass id token here as well?
			}
		})
    })
    return router
}