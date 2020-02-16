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

	accountManager.logInAccount(account, function (error) {

		if (error) {
			const model = {
				error: error,
			}
			response.render("login.hbs", model)
		}
		else {
			//session magic 
			response.redirect("../home")
		}
	})
})



//SIGN UP
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/signup', function (request, response) {
	response.render("signUp.hbs")
})

<<<<<<< HEAD

//Ändra detta tillbaka att hämta hem ID istället för email dummer.
router.get('/profile/:email', function (request, response) {
=======
>>>>>>> Denni_Branch

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
router.get('/profile', function (request, response) {
	response.render("profile.hbs")
})

module.exports = router