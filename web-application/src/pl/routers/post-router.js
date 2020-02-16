const express = require('express')
const postManager = require('../../bll/post-manager')
const categoryManager = require('../../bll/category-manager')
const locationManager = require('../../bll/location-manager')
const locationRouter = require('./location-router')
const categoryRouter = require('./category-router')

const router = express.Router()

/**
 * Retrieves location and category from the database 
 * and renders it in createPost.hbs
 */
router.get('/create-post', function (request, response) {

	locationRouter.getAllLocations(function (error, location) {

		if (error) {
			const model = {
				error: error,
			}
			response.render("createPost.hbs", model)
		}

		else {
			categoryRouter.getAllCategories(function (error, category) {

				if (error) {
					const model = {
						error: error,
					}
					response.render("createPost.hbs", model)
				}

				else {
					const model = {
						location: location,
						category: category
					}
					response.render("createPost.hbs", model)
				}
			})
		}
	})
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Post request for creating a post and insert it into the POST table
 */
router.post("/create-posts", function (request, response) {

	const post = request.body

	postManager.createPost(post, function (error) {

		if (error) {
			const model = {
				error: error,
				post,
			}
			response.render("createPost.hbs", model)
		}
		else {
			response.render("createPost.hbs")
		}
	})
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This get request is sent when just rendering the page, and no search has been made
router.get("/search-posts", function (request, response) {

	try {

		var model = {}
		
		const categories = categoryManager.getAllCategories(function(errors, categories){

			if (errors){
				model = {errors}
				response.render("searchPosts.hbs", model)
			}

			else{ //No error fetching categories, ok to go on and fetch locations

				const locations = locationManager.getAllLocations(function (errors, locations){
					
					if (errors){
						model = {errors}
						response.render("searchPosts.hbs", model)
					}

					else{ //No error fetching locations, ok to go on and render page
						model={
							categories:categories,
							locations:locations
						}
						response.render("searchPosts.hbs", model)
					}
				})
			}

		})
		
	}


	catch (error) { //this error is a router error

		const model = {
			routerError: error
		}

		response.render("routerError.hbs", model)

	}

})


////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This get request is sent when a search has been made!
router.get("/execute-search", function (request, response) {

	//const categoryId = request.params.category
	//const locationId = request.params.location

	const categoryId = 1
	const locationId = 1

	try { 

		var model = {}
		
		categoryManager.getAllCategories(function(errors, categories){

			if (errors){
				model = {errors}
				response.render("searchPosts.hbs", model)
			}

			else{ //No error fetching categories, ok to go on and fetch locations

				locationManager.getAllLocations(function (errors, locations){
					
					if (errors){
						model = {errors}
						response.render("searchPosts.hbs", model)
					}

					else{ //No error fetching locations, ok to go on and fetch all matching posts
						
						const posts = postManager.getPostsByCategoryIdAndLocationId(categoryId, locationId, function(errors, posts){

							if (errors){
								model = {errors}
								response.render("searchPosts.hbs", model)
							}

							else{

								model={
									categories:categories,
									locations:locations,
									posts:posts, 
									searchHasBeenMade: true
								}
								response.render("searchPosts.hbs", model)

							}
						})
					}
				})
			}
		})	
	}


	catch (error) { //this error is a router error

		const model = {
			routerError: error
		}

		response.render("routerError.hbs", model)

	}

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router
