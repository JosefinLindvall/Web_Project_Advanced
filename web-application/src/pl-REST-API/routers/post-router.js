const express = require('express')


module.exports = function ({ postManager, categoryManager, locationManager, sessionHandler }) {

	const router = express.Router()

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Retrieves location and category from the database 
	 * and renders it in createPost.hbs
	 */
	router.get('/create-post', sessionHandler.checkedIfLoggedInAsRegUser, function (request, response) {

		locationManager.getAllLocations(function (error, location) {

			if (error) {
				const model = {
					error: error,
				}
				response.render("createPost.hbs", model)
			}
			else {
				categoryManager.getAllCategories(function (error, category) {

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
	 * TODO kanske redirecta till create post istället för att slippa denna härva.
	 */
	router.post("/create-post", sessionHandler.checkedIfLoggedInAsRegUser, function (request, response) {

		const post = request.body
		const accountID = request.session.accountID
	

		postManager.createPost(post, accountID, function (error) {
			if (error) {
				const model = {
					error: error,
				}
				response.render("createPost.hbs", model)
			}
			else {
				locationManager.getAllLocations(function (error, location) {
					if (error) {
						const model = {
							error: error
						}
						response.render("createPost.hbs", model)
					}
					else {
						categoryManager.getAllCategories(function (error, category) {
							if (error) {
								const model = {
									error: error
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
			}
		})
	})

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//This get request is sent when just rendering the page, and no search has been made
	router.get("/search-posts", function (request, response) {

		try {

			var model = {}

			categoryManager.getAllCategories(function (errors, categories) {

				if (errors) {
					model = { errors }
					response.render("searchPosts.hbs", model)
				}

				else { //No error fetching categories, ok to go on and fetch locations

					locationManager.getAllLocations(function (errors, locations) {

						if (errors) {
							model = { errors }
							response.render("searchPosts.hbs", model)
						}

						else { //No error fetching locations, ok to go on and render page
							model = {
								categories: categories,
								locations: locations
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

		const categoryId = request.query.categoryID
		const locationId = request.query.locationID

		try {

			var model = {}

			categoryManager.getAllCategories(function (errors, categories) {

				if (errors) {
					model = { errors }
					response.render("searchPosts.hbs", model)
				}

				else { //No error fetching categories, ok to go on and fetch locations

					locationManager.getAllLocations(function (errors, locations) {

						if (errors) {
							model = { errors }
							response.render("searchPosts.hbs", model)
						}

						else { //No error fetching locations, ok to go on and fetch all matching posts

							postManager.getPostsByCategoryIdAndLocationId(categoryId, locationId, function (errors, posts) {
								if (errors) {
									model = { errors }
									response.render("searchPosts.hbs", model)
								}

								//skicka med postID till modellen?
								else {
									model = {
										categories: categories,
										locations: locations,
										posts: posts,
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

	return router
}