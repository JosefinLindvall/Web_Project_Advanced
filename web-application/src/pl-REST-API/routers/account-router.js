const express = require('express')
const serverSecret = "hjkbdfkhbefbeivgjebviuebive"
const jwt = require('jsonwebtoken')

module.exports = function ({ accountManager }) {


	const router = express.Router()


	//LOG IN
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	router.post('/tokens', function (request, response) {
	
		const grantType = request.body.grant_type
		const typedEmail = request.body.email
		const typedPassword = request.body.password

		
		if (grantType != "password") {
			response.status(400).json({error: "unsupported_grant_type"})
		}


		accountManager.logInAccount(typedEmail, typedPassword, function (errors, typeOfUser, accountID) {


			if (errors != null){

				if (errors.includes("Database error.")) { 
					response.status(500).end()
				}
				
				else { //These errors are validation errors!
					response.status(400).json(errors)
				}
				

			}
			
			else {	
				const payload = {id: accountID}
				const accessToken = jwt.sign(payload, serverSecret)
				response.status(202).json({access_token: accessToken, account_id: accountID}) //do we need to pass id token here as well?
			}
		})
	})

	// //LOG OUT    ??????
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// router.post('/logout', function (request, response) {
	
	// 	//Add token stuff

	// 	response.status(205) //No data, refresh
	// })


	//SIGN UP
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	// //Post request to send user info into the Account table. 
	router.post('/accounts', function (request, response) {
		
		const account = request.body
		
		accountManager.createAccount(account, function (errors, accountID) {
			

			if (errors != null) {
				
				if (errors.includes("Database error.")) { 
					response.status(500).end()
				}
				
				else { //These errors are validation errors!
					response.status(400).json(errors)
				}
			}

			else {
				response.status(201).json().end()
			}
		})
	})


	// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// router.get('/profile', sessionHandler.checkedIfLoggedInAsRegUser, function (request, response) {

	// 	const accountID = request.session.accountID
		
	// 	accountManager.getUserInformation(accountID, function (error, currUserInfo) {

	// 		const firstName = currUserInfo.firstName
	// 		const lastName = currUserInfo.lastName
	// 		const email = currUserInfo.email
	// 		const phoneNumber = currUserInfo.phoneNumber
	// 		const birthDate = currUserInfo.birthDate
	// 		const gender = currUserInfo.gender

			

	// 		if (error) {
	// 			const model = {
	// 				error: error
	// 			}
	// 			response.render("profile.hbs", model)
	// 		}
	// 		else {
	// 			const model = {
	// 				firstName: firstName,
	// 				lastName: lastName,
	// 				email: email,
	// 				phoneNumber: phoneNumber,
	// 				birthDate: birthDate,
	// 				gender: gender
	// 			}
	// 			response.render("profile.hbs", model)
	// 		}
	// 	})
	// })

	// router.get('/profile/:id', sessionHandler.checkedIfLoggedInAsRegUser, function (request, response) {

	// 	const userPostID = request.params.id

	// 	accountManager.getUserInformation(userPostID, function (error, currUserInfo) {

	// 		const firstName = currUserInfo.firstName
	// 		const lastName = currUserInfo.lastName
	// 		const email = currUserInfo.email
	// 		const phoneNumber = currUserInfo.phoneNumber
	// 		const birthDate = currUserInfo.birthDate
	// 		const gender = currUserInfo.gender

	// 		if (error) {
	// 			const model = {
	// 				error: error
	// 			}
	// 			response.render("profile.hbs", model)
	// 		}
	// 		else {
	// 			const model = {
	// 				firstName: firstName,
	// 				lastName: lastName,
	// 				email: email,
	// 				phoneNumber: phoneNumber,
	// 				birthDate: birthDate,
	// 				gender: gender
	// 			}
	// 			response.render("profile.hbs", model)
	// 		}
	// 	})
	// })
	return router
}