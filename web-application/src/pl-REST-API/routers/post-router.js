const express = require('express')
const jwt = require('jsonwebtoken')
const serverSecret = require('server-secret')

module.exports = function ({postManager}) {

	const router = express.Router()

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	router.post("/posts", function (request, response) {

		//const post = request.body.post // can we do this????

		const title = request.body.title
		const content = request.body.content
		const categoryID = request.body.categoryID
		const locationID = request.body.locationID
		
		const post = {title: title, content: content, categoryID: categoryID, locationID: locationID}

		const accessToken = request.body.access_token
		//const grantType = request.body.grant_type ////oh wgyyyyyyyyyyy yes telll meeeeeeee
		var accountID = -1
		var typeOfUser = "invalide user type"
		
		  
		try {
			const payload = jwt.verify(accessToken, serverSecret) 
	
			accountID = payload.id
			typeOfUser = payload.name
		}

		catch (error) {
			response.status(401).end()
			return
		}

	
	
		postManager.createPost(post, accountID, function (errors) {

			if (errors != null) {

                if (errors.includes("Database error.")) { 
					response.status(500).end()
				}   
                else { //These errors are validation errors!
					response.status(400).json(errors)
				}
			}
			else {
				response.status(201).end()
			}
		})
	})

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	router.get('/', function (request, response) {

        try {
            postManager.getSixLatestPosts(function (error, posts) {

                let model = {}

                if (error) {
                    model = {
                        error: error
                    }
                    response.render("home.hbs", model)
                }

                else {
                    model = {
                        posts: posts
                    }
                    response.render("home.hbs", model)
                }
            })
        }

        catch (error) {

            const model = {
                routerError: error
            }

            response.render("routerError.hbs", model)
        }
    })

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	router.delete('/posts/:id', function(request, response) {

		const accessToken = request.body.access_token
		var typeOfUser = "invalide user type"
		
		try {
			const payload = jwt.verify(accessToken, serverSecret) 
			typeOfUser = payload.name
		}

		catch (error) { // User is not logged in at all
			response.status(401).end()
			return
		}

		if (typeOfUser == "Admin") {
			
			const postId = request.params.id

			postManager.deletePost(postId, function(error) {

				if (error) { 
					response.status(500).end()
				}  
				else {
					response.status(204).end()
				}
			})
		}
		// not logged in as admin
		else {
			response.status(401).end()
		} 
	})

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	router.put('/posts/:id', function(request, response){

		const postId = request.params.id

		const title = request.body.title
		const content = request.body.content
		const categoryID = request.body.categoryID
		const locationID = request.body.locationID
		
		const updatedPost = {title: title, content: content, categoryID: categoryID, locationID: locationID}

		const accessToken = request.body.access_token
		var typeOfUser = "Invalide user type"
		
		  
		try {
			const payload = jwt.verify(accessToken, serverSecret) 
			typeOfUser = payload.name
		}

		catch (error) { //Not logged in at all
			response.status(401).end()
			return
		}

		if (typeOfUser == "Admin") {
			postManager.updatePost(postId, updatedPost, function(errors) {
				
				if (errors != null) {

					if (errors.includes("Database error.")) { 
						response.status(500).end()
					}   
					else { //These errors are validation errors!
						response.status(400).json(errors)
					}
				}
				else {
					response.status(204).end()
				}
			})
		}

		else { //Not logged in as admin!
			response.status(401).end()
		}
	})

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return router
}