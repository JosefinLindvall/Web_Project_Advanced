const express = require('express')

module.exports = function ({ postManager, categoryManager, locationManager, sessionHandler }) {

	const router = express.Router()

	router.get('/create-post', sessionHandler.checkIfLoggedInAsRegUser, function (request, response) {

		try {
			locationManager.getAllLocations(function (error, location) {

				if (error) {
					const model = {
						error: error,
						csrfToken: request.csrfToken()
					}
					response.render("createPost.hbs", model)
				}
				else {
					categoryManager.getAllCategories(function (error, category) {

						if (error) {
							const model = {
								error: error,
								csrfToken: request.csrfToken()
							}
							response.render("createPost.hbs", model)
						}
						else {
							const model = {
								location: location,
								category: category, 
								csrfToken: request.csrfToken()
							}
							response.render("createPost.hbs", model)
						}
					})
				}
			})
		}

		catch (error) { 

			const model = {
				routerError: error,
				csrfToken: request.csrfToken()
			}

			response.render("routerError.hbs", model)
		}
	})

	router.post("/create-post", sessionHandler.checkIfLoggedInAsRegUser, function (request, response) {

		const post = request.body
		const accountID = request.session.accountID

		try {

			postManager.createPost(post, accountID, function (errorsWhenCreatingPost) {
						
				if (errorsWhenCreatingPost) {

					locationManager.getAllLocations(function (error, location) {
						if (error) {
							const model = {
								error: error, 
								csrfToken: request.csrfToken()
							}
							response.render("createPost.hbs", model)
						}
						
						else {
							
							categoryManager.getAllCategories(function (error, category) {
								if (error) {
									const model = {
										error: error, 
										csrfToken: request.csrfToken()
									}
									response.render("createPost.hbs", model)
								}
								else {
									const model = {
										error: errorsWhenCreatingPost,
										location: location,
										category: category, 
										csrfToken: request.csrfToken()
									}
									response.render("createPost.hbs", model)
								}
							})
						}
					})
				}
					
				else {

					locationManager.getAllLocations(function (error, location) {
						
						if (error) {
							const model = {
								error: error, 
								csrfToken: request.csrfToken()
							}
							response.render("createPost.hbs", model)
						}
						else {

							categoryManager.getAllCategories(function (error, category) {
								
								if (error) {
									const model = {
										error: error, 
										csrfToken: request.csrfToken()
									}
									response.render("createPost.hbs", model)
								}
								else {
									const model = {
										location: location,
										category: category, 
										csrfToken: request.csrfToken()
									}
									response.render("createPost.hbs", model)
								}
							})
						}
					})
				}
			})
		}

		catch (error) { 

			const model = {
				routerError: error,
				csrfToken: request.csrfToken()
			}
			response.render("routerError.hbs", model)
		}
	})
	
	router.get("/search-posts", function (request, response) {

		try {

			var model = {}

			categoryManager.getAllCategories(function (errors, categories) {

				if (errors) {

					model = { 
						errors,
						csrfToken: request.csrfToken()
					 }
					response.render("searchPosts.hbs", model)
				}

				else { 

					locationManager.getAllLocations(function (errors, locations) {

						if (errors) {

							model = { 
								errors,
								csrfToken: request.csrfToken()
							}
							response.render("searchPosts.hbs", model)
						}

						else { 
							
							model = {
								categories: categories,
								locations: locations, 
								csrfToken: request.csrfToken()
							}
							response.render("searchPosts.hbs", model)
						}
					})
				}
			})
		}

		catch (error) { 

			const model = {
				routerError: error,
				csrfToken: request.csrfToken()
			}
			response.render("routerError.hbs", model)
		}
	})

	router.get("/execute-search", function (request, response) {

		const categoryId = request.query.categoryID
		const locationId = request.query.locationID
|
		console.log(categoryId)

		if (categoryId == null || locationId == null) {
			response.redirect("/post/search-posts")
			return
		}

		try {

			var model = {}

			categoryManager.getAllCategories(function (errors, categories) {

				if (errors) {

					model = { 
						errors,
						csrfToken: request.csrfToken() 
					}
					
					response.render("searchPosts.hbs", model)
				}

				else { 

					locationManager.getAllLocations(function (errors, locations) {

						if (errors) {

							model = { 
								errors,
								csrfToken: request.csrfToken()
							}

							response.render("searchPosts.hbs", model)
						}

						else { 

							postManager.getPostsByCategoryIdAndLocationId(categoryId, locationId, function (errors, posts) {
								
								if (errors) {

									model = { 
										errors,
										csrfToken: request.csrfToken()
									}
									response.render("searchPosts.hbs", model)
								}

								else {
									model = {
										categories: categories,
										locations: locations,
										posts: posts,
										searchHasBeenMade: true, 
										csrfToken: request.csrfToken()
									}
									response.render("searchPosts.hbs", model)
								}
							})
						}
					})
				}
			})
		}

		catch (error) { 

			const model = {
				routerError: error,
				csrfToken: request.csrfToken()
			}
			response.render("routerError.hbs", model)
		}
	})
	return router
}