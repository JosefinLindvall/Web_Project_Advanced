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

	const typedEmail = request.body.email
	const typedPassword = request.body.password

	accountManager.logInAccount(typedEmail, typedPassword, function (error, typeOfUser, accountID) {

		if (error) {
			const model = {
				error: error,
			}
			response.render("login.hbs", model)
		}

		else {
			if (typeOfUser == "Admin") {
				request.session.isLoggedInAsAdmin = true
				request.session.isLoggedInAsReg = true

				request.session.accountID = accountID
			}

			else if (typeOfUser == "User") {
				request.session.isLoggedInAsReg = true
				request.session.accountID = accountID
			}
			response.redirect("/")
		}
	})
})

//LOG OUT
//////////////////////////////////////////////////////////////////////////////////////////

router.post('/logout', function (request, response) {

	request.session.isLoggedInAsReg = false
	request.session.isLoggedInAsAdmin = false
	request.session.accountID = null

	response.redirect("/")

})


//SIGN UP
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/signup', function (request, response) {
	response.render("signUp.hbs")
})


// //Post request to send user info into the Account table. 
router.post('/signup', function (request, response) {
	const account = request.body

	accountManager.createAccount(account, function (error, accountID) {

		if (error) {
			const model = {
				error: error,
			}
			response.render("signUp.hbs", model)
		}
		else {

			request.session.isLoggedInAsReg = true
			request.session.accountID = accountID
			response.redirect("/")
		}
	})
})


//PROFILE INTE KLAR 
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile', sessionHandler.checkedIfLoggedInAsRegUser, function (request, response) {

	try {
		// call account manager 
		response.render("profile.hbs")
		console.log(request.session.accountID)
	}

	catch (error) {

		const model = {
			routerError: error
		}

		response.render("routerError.hbs", model)
	}
})

module.exports = router