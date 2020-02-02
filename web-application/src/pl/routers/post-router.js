const express = require('express')
const postManager = require('../../bll/post-manager')

const router = express.Router()

router.get('/', function (request, response) {
	response.render("createPost.hbs")
})

router.post('/', function (request, response) {

	const title = request.body.title
	const email = request.body.email
	const content = request.body.content
	const category = request.body.category
	const location = request.body.location

	const post = [title, email, content, category, location]

	postManager.createPost(post, function (error) {

		if (error) {
			const model = {
				somethingWentWrong: true,
				post,
			}
			response.render("createPost.hbs", model)
		}
		else {
			const model = {
				somethingWentWrong: false,
				post,
			}
			response.render("createPost.hbs", model)
		}
	})
})




////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router
