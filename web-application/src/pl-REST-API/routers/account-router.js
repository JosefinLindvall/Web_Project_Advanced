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
			response.status(400).json({ error: "unsupported_grant_type" })
		}


		accountManager.logInAccount(typedEmail, typedPassword, function (errors, typeOfUser, accountID) {

			if (errors != null) {

				if (errors.includes("Database error.")) {
					response.status(500).end()
				}

				else { //These errors are validation errors!
					response.status(400).json(errors)	
				}
			}
			else {
				const payload = { accountID: accountID, typeOfUser: typeOfUser }
				const accessToken = jwt.sign(payload, serverSecret)
				response.status(202).json({access_token: accessToken, account_id: accountID, typeOfUser: typeOfUser}) //do we need to pass id token here as well?
			}
		})
	})


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

	return router
}