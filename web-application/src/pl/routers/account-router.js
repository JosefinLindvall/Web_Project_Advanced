const express = require('express')
const accountManager = require('../../bll/account-manager')

const router = express.Router()

//LOG IN
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/login', function (request, response) {
	response.render("login.hbs")
})

//Post request to log in a user should it have ID with it? 
router.post('/login', function (request, response) {
	const account = request.body
})



//SIGN UP
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/signup', function (request, response) {
	response.render("signUp.hbs")
})


//Post request to send user info into the Account table. 
router.post('/signup', function (request, response) {

	const account = request.body

	accountManager.createAccount(account, function (error) {

		if (error) {
			const model = {
				error: error,
				account,
			}
			response.render("signUp.hbs", model)
		}
		else {
			response.redirect("../home")
		}
	})
})

//PROFILE INTE KLAR 
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile', function (request, response) {
	response.render("profile.hbs")
})

module.exports = router