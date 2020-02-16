const express = require('express')
const postManager = require('../../bll/post-manager')
const router = express.Router()

router.get('/', function (request, response) {

    try{
        
        postManager.getLatestSixPosts(function(error, posts){

            const model = {}
    
            if (error){
                model = {
                    error:error
                }
            }

            else{
                model = {
                    posts: posts
                }
            }
    
    
        })
        response.render("home.hbs", model)

    }

    catch(error){
       
        const model = {
			routerError: error
		}

		response.render("routerError.hbs", model)
    }

    
})



router.get('/about-us', function(request, response) {
    response.render("about.hbs")
})

module.exports = router