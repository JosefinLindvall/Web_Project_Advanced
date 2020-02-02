const express = require('express')
const accountManager = require('../../bll/account-manager')

const router = express.Router()


//LOG IN
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/login', function (request, response) {
	response.render("login.hbs")
})



//SIGN UP
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/signup', function (request, response) {
	response.render("signUp.hbs")
})

router.post('/signup', function (request, response) {

	const firstName = request.body.firstName
	const lastName = request.body.lastName
	const password = request.body.password
	const email = request.body.email
	const phoneNumber = request.body.phoneNumber
	const birthDay = request.body.birthday
	const gender = request.body.gender

	const account = [firstName, lastName, password, email, phoneNumber, birthDay, gender]

	accountManager.createAccount(account, function (error) {

		if (error) {
			const model = {
				somethingWentWrong: true,
				account,
			}
			response.render("signUp.hbs", model)
		}
		else {
			const model = {
				somethingWentWrong: false,
				account,
			}
			response.render("signUp.hbs", model)
		}
	})
})



//PROFILE
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile', function (request, response) {
	response.render("profile.hbs")
})


router.get('/profile/:email', function (request, response) {

	const email = request.body.email
	console.log(email)
	accountManager.getAccountByEmail(email, function (error, account) {

		if (error) {
			const model = {
				somethingWentWrong: true,
				account,
			}
			response.render("profile.hbs", model)
		}
		else {
			const model = {
				somethingWentWrong: false,
				account,
			}
			response.render("profile.hbs", model)
		}
	})
})

module.exports = router