const express = require('express')
const jwt = require('jsonwebtoken')
const serverSecret = require('../server-secret')

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

		const authorizationHeader = request.get('authorization')
		const accessToken = authorizationHeader.substr("Bearer ".length)
	
		var accountID = -1
		  
		try {
			const payload = jwt.verify(accessToken, serverSecret) 
			accountID = payload.accountID
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
	
	router.get('/posts', function (request, response) {

		postManager.getSixLatestPosts(function (error, posts) {

			if (error) {
				response.status(500).end() //db error!
			}

			else {
				response.status(200).json({posts: posts}) 
			}
		})   
    })

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	router.delete('/posts/:id', function(request, response) {

		console.log("do we even get inside rest ")
		var typeOfUser = "invalide user type"

		const authorizationHeader = request.get('authorization')
		const accessToken = authorizationHeader.substr("Bearer ".length)
		
		try {
			const payload = jwt.verify(accessToken, serverSecret) 
			typeOfUser = payload.typeOfUser
			console.log(typeOfUser)
		}

		catch (error) { // User is not logged in at all
			response.status(401).end()
			return
		}

		if (typeOfUser == "Admin") {
			
			const postId = request.params.id
			console.log(postId)

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

		const postID = request.params.id

		const title = request.body.title
		const content = request.body.content

		const updatedPost = {title: title, content: content, postID: postID}
		
		const accessToken = request.body.access_token
		var typeOfUser = "Invalide user type"
		
	
		try {
			const payload = jwt.verify(accessToken, serverSecret) 
			typeOfUser = payload.typeOfUser
		}

		catch (error) { //No access token, not logged in at all
			response.status(401).end()
			return
		}

	
		postManager.updatePost(updatedPost, typeOfUser, function(errors) {
			
			if (errors != null) {

				if (errors.includes("Database error.")) { // Database error
					response.status(500).end()
				}   

				else if (errors.includes("Unauthorized to update post.")) { // Not logged in as admin
					response.status(401).end()
				}
				
				else { //These errors are validation errors!
					response.status(400).json(errors)
				}
			}
			
			else { //No errors!
				response.status(204).end()
			}
		})
	})

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return router
}