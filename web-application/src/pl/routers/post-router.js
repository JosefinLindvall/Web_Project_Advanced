const express = require('express')
const postManager = require('../../bll/post-manager')

const router = express.Router()

router.get('/', function(request, response) {
    response.render("createPost.hbs")
})

//Hör huruvida vi ska göra med location och category när man skapar en ny post
router.post('/', function(request, response) {

    const title = request.body.title
    const email = request.body.email
    const content = request.body.content
    
    const post = [title, email, content]
    
	postManager.createPost(post, function(error) {
		
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

module.exports = router