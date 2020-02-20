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

			console.log(typeof(typeOfUser))
			
			
			if (typeOfUser == "Admin") {
				console.log("type of user is admin")
				request.session.isLoggedInAsAdmin = true
				request.session.isLoggedInAsReg = true

				request.session.accountID = accountID
			}

			else if (typeOfUser == "User") {
				console.log("type of user is user")
				request.session.isLoggedInAsReg = true
				request.session.accountID = accountID
			}

			console.log(request.session.isLoggedInAsReg)
			console.log(request.session.accountID) // 1 
			response.redirect("/")
		}
	})
})

//LOG OUT
//////////////////////////////////////////////////////////////////////////////////////////
router.post('/logout', function(request, response){

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
// router.get('/profile', sessionHandler.checkedIfLoggedInAsRegUser(request, response, next), function (request, response) {
// 	response.render("profile.hbs")
// })

module.exports = router