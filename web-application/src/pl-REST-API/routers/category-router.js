const express = require('express')

module.exports = function ({categoryManager}) {

    const router = express.Router()
 
	router.get('/categories', function (request, response) {
	
		categoryManager.getAllCategories(function (errors, categories) {

			if (errors != null) {
                
                if (errors.includes("Database error.")) { 
					response.status(500).end()
				}
                
                else { //These errors are validation errors!
					response.status(400).json(errors)
				}
			}
			else {	
				response.status(200).json({categories: categories}) //do we need to pass id token here as well?
			}
		})
    })
    return router
}
