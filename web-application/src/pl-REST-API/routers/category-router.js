const express = require('express')

module.exports = function ({categoryManager}) {

    const router = express.Router()
 
	router.get('/categories', function (request, response) {
	
		categoryManager.getAllCategories(function (errors, categories) {

			if (errors) {
				response.status(500).end() 
			}
			
			else {	
				response.status(200).json({categories: categories}) 
			}
		})
    })
    return router
}
