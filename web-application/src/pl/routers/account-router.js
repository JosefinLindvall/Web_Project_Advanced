const express = require('express')

module.exports = function ({ accountManager, sessionHandler }) {

	const router = express.Router()

	router.get('/login', function (request, response) {

		const model = {
			csrfToken: request.csrfToken()
		}

		response.render("login.hbs", model)
	})

	router.post('/login', function (request, response) {

		const typedEmail = request.body.email
		const typedPassword = request.body.password

		try {
			accountManager.logInAccount(typedEmail, typedPassword, function (error, typeOfUser, accountID) {

				if (error) {
					const model = {
						error: error,
						csrfToken: request.csrfToken()
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
		}

		catch (error) { 
			const model = {
				routerError: error
			}
			response.render("routerError.hbs", model)
		}
	})

	router.post('/logout', function (request, response) {

		request.session.isLoggedInAsReg = false
		request.session.isLoggedInAsAdmin = false
		request.session.accountID = null

		response.redirect("/")	
	})

	router.get('/signup', function (request, response) {

		const model = {
			csrfToken: request.csrfToken()
		}

		response.render("signUp.hbs", model)
	})

	router.post('/signup', function (request, response) {

		const account = request.body

		try {
			accountManager.createAccount(account, function (error, accountID) {
				
				if (error) {
					const model = {
						error: error,
						csrfToken: request.csrfToken()
					}
					response.render("signUp.hbs", model)
				}
				else {
					request.session.isLoggedInAsReg = true
					request.session.accountID = accountID
					response.redirect("/")
				}
			})
		}

		catch (error) { 
			const model = {
				routerError: error, 
				csrfToken: request.csrfToken()
			}
			response.render("routerError.hbs", model)
		}
	})

	router.get('/profile', sessionHandler.checkIfLoggedInAsRegUser, function (request, response) {

		const accountID = request.session.accountID

		try {
			accountManager.getUserInformation(accountID, function (error, currUserInfo) {

				const firstName = currUserInfo.firstName
				const lastName = currUserInfo.lastName
				const email = currUserInfo.email
				const phoneNumber = currUserInfo.phoneNumber
				const birthDate = currUserInfo.birthDate
				const gender = currUserInfo.gender

				if (error) {
					const model = {
						error: error,
						csrfToken: request.csrfToken()
					}
					 	
					response.render("profile.hbs", model)
				}
				else {
					const model = {
						firstName: firstName,
						lastName: lastName,
						email: email,
						phoneNumber: phoneNumber,
						birthDate: birthDate,
						gender: gender,
						csrfToken: request.csrfToken()
					}
					response.render("profile.hbs", model)
				}
			})
		}

		catch (error) { 
			const model = {
				routerError: error, 
				csrfToken: request.csrfToken()
			}
			response.render("routerError.hbs", model)
		}
	})

	router.get('/profile/:id', sessionHandler.checkIfLoggedInAsRegUser, function (request, response) {

		const userPostID = request.params.id

		try {
			accountManager.getUserInformation(userPostID, function (error, currUserInfo) {

				const firstName = currUserInfo.firstName
				const lastName = currUserInfo.lastName
				const email = currUserInfo.email
				const phoneNumber = currUserInfo.phoneNumber
				const birthDate = currUserInfo.birthDate
				const gender = currUserInfo.gender

				if (error) {
					const model = {
						error: error,
						csrfToken: request.csrfToken()
					}
					response.render("profile.hbs", model)
				}
				else {
					const model = {
						firstName: firstName,
						lastName: lastName,
						email: email,
						phoneNumber: phoneNumber,
						birthDate: birthDate,
						gender: gender,
						csrfToken: request.csrfToken()
					}
					response.render("profile.hbs", model)
				}
			})
		}

		catch (error) { 
			const model = {
				routerError: error,
				csrfToken: request.csrfToken()
			}
			response.render("routerError.hbs", model)
		}
	})
	return router
}