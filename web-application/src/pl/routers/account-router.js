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



//PROFILE
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile', function (request, response) {
	response.render("profile.hbs")
})

router.get('/profile/:email', function (request, response) {

	const email = "dennisfram@hotmail.com"

	accountManager.getAccountByEmail(email, function (error, account) {

		if (error) {
			const model = {
				error: error,
				account,
			}
			response.render("profile.hbs", model)
		}
		else {
			response.redirect("../profile", model)
		}
	})
})

module.exports = router