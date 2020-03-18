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
				//TODO : put id token in here as well!
				response.status(202).json({access_token: accessToken, account_id: accountID, typeOfUser: typeOfUser}) 
			}
		})
	})


	//SIGN UP
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	router.post('/accounts', function (request, response) {

		 console.log ("in rest apiiiii")
		 const data = request.body
		 const firstName = request.body.firstName
		 //console.log(firstName)
	
		const account = {firstName: data.firstName, lastName: data.lastName, email: data.email, phoneNumber: data.phoneNumber, 
			password: data.password , birthDate: data.birthDate, gender: data.gender }


		// 	console.log(account)
		// 	console.log(account.firstName)
			

		 //console.log(data.firstName)

		 //const obj = JSON.parse(JSON.stringify(request.body))
		 //const obj2 = JSON.parse((request.body))

		// for (bla of obj) {
		// 	console.log(bla)
		// }

		 //console.log(obj2)

	//	 var account = {}

		// for (var key in data) {
		// 	//console.log(key)
		// 	//console.log(data[key])

		// 	//console.log(data[key].firstName)

		// 	account.key = data[key]

		// }

	//	console.log(account)

		//console.log(obj[0].firstName)
		//console.log(obj.firstName)

		// console.log(data[0].firstName)
		// console.log(data[0].object)
		// console.log(data[0].object.firstName)
		// console.log(data[0].firstName)

	//	console.log(data)

		
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


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return router
}