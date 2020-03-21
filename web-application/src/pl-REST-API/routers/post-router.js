const express = require('express')
const jwt = require('jsonwebtoken')
const serverSecret = require('../server-secret')

module.exports = function ({postManager}) {

	const router = express.Router()

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	router.post("/posts", function (request, response) {
	
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

		
	router.get('/posts/:id', function (request, response) {

		const postID = request.params.id

		postManager.getPostByPostId(postID, function (error, post) {

			console.log(post)

			if (error) {
				console.log(error)
				response.status(500).end() //db error!
			}

			else {
				response.status(200).json({post: post}) 
			}
		})   
    })

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	router.delete('/posts/:id', function(request, response) {

		var typeOfUser = "invalide user type"

		const authorizationHeader = request.get('authorization')
		const accessToken = authorizationHeader.substr("Bearer ".length)
		
		try {
			const payload = jwt.verify(accessToken, serverSecret) 
			typeOfUser = payload.typeOfUser
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
		
		else {  // not logged in as admin
			response.status(401).end()
		} 
	})

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	router.put('/posts/:id', function(request, response){

		//Reading values from uri and body 

		const postID = request.params.id
		const title = request.body.title
		const content = request.body.content

		//Validating user before proceeding to update post

		var typeOfUser = "invalid user type"
		const authorizationHeader = request.get('authorization')
		const accessToken = authorizationHeader.substr("Bearer ".length)
	
		try {
			const payload = jwt.verify(accessToken, serverSecret) 
			typeOfUser = payload.typeOfUser
		}

		catch (error) { //No access token, not logged in at all
			response.status(401).end() 
			return
		}

	
		if (typeOfUser == "Admin") {
			
			const updatedPost = {title: title, content: content, postID: postID}
			postManager.updatePost(updatedPost, typeOfUser, function(errors) {
				
				if (errors != null) {

					if (errors.includes("Database error.")) { // Database error
						response.status(500).end()
					}   

					else if (errors.includes("Unauthorized to update post.")) { // Not logged in as admin
						response.status(401).end()
					}
					
					else { 
						console.log(errors)  // ger tillbaka detta: [ 'Need to enter a title', 'Need to enter some content' ]
						response.status(400).json(errors)		
					}
				}
				
				else { //No errors!
					response.status(204).end()
				}
			})

		}

		else { //Not logged in as Admin!
			response.status(401).end()
		}
	})

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return router
}