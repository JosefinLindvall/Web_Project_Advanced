const express = require('express')
const accountManager = require('../../bll/account-manager')
const sessionHandler = require('../session-handler')

const router = express.Router()

//LOG IN
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/login', function (request, response) {
	response.render("login.hbs")
})

//Post request to log in a user should it have ID with it? 
router.post('/login', function (request, response) {

	const account = request.body

	accountManager.logInAccount(account, function (error, typeOfUser) {

		if (error) {
			const model = {
				error: error,
			}
			response.render("login.hbs", model)
		}

		else {

			if (typeOfUser == "admin") {
				resquest.session.isLoggedInAsAdmin = true
				request.session.isLoggedInAsReg = true
			}

			else if (typeOfUser == "user") {
				request.session.isLoggedInAsReg = true
			}

			response.redirect("../home")
		}
	})
})



//SIGN UP
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/signup', function (request, response) {
	response.render("signUp.hbs")
})


// //Post request to send user info into the Account table. 
router.post('/signup', function (request, response) {
	const account = request.body

	accountManager.createAccount(account, function (error) {

		if (error) {
			const model = {
				error: error,
			}
			response.render("signUp.hbs", model)
		}
		else {
			//redirect to log in page instead.
			response.redirect("../home")
		}
	})
})


//PROFILE INTE KLAR 
//////////////////////////////////////////////////////////////////////////////////////////
// router.get('/profile', sessionHandler.checkedIfLoggedInAsRegUser(request, response, next), function (request, response) {
// 	response.render("profile.hbs")
// })

module.exports = router