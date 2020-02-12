const express = require('express')
const postManager = require('../../bll/post-manager')
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
//Probably old code from her?
router.get("/search-posts", function (request, response) {

	const categoryOptions = ["any", "hiking", "fishing", "bowling"] //where to store this array??
	const locationOptions = ["any", "Eksjö", "Jönköping", "Örebro"] //where to store this array??

	try {

		const model = {
			categoryOptions, //from the array above
			locationOptions //from the array above
		}

		response.render("searchPosts.hbs", model)
	}


	catch (error) { //this error is a router error

		const model = {
			routerError: error
		}

		response.render("routerError.hbs", model)

	}

})


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//probably old code from her
router.get("/search-posts/:category&:location", function (request, response) {

	const categoryOptions = ["any", "hiking", "fishing", "bowling"] //where to store this array??
	const locationOptions = ["any", "Eksjö", "Jönköping", "Örebro"] //where to store this array??

	const category = request.params.category
	const location = request.params.location

	try {

		const posts = postManager.getPostsByCategoryAndLocation(category, location, function (errors, posts) {

			const model = {
				errors: errors, //these errors are either database errors or validation errors...
				posts: posts,
				categoryOptions, //from the array above
				locationOptions, //from the array above
				searchHasBeenMade: true
			}

			response.render("searchPosts.hbs", model)
		})

	}

	catch (error) { //this error is a router error

		const model = {
			routerError: error
		}

		response.render("routerError.hbs", model)

	}

})

module.exports = router
