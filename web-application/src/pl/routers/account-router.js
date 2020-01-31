const express = require('express')
const accountManager = require('../../bll/account-manager')

const router = express.Router()

router.get('/login', function(request, response) {
    response.render("login.hbs")
})

router.get('/signup', function(request, response) {
    response.render("signUp.hbs")
})

// Discuss how we should do when we send female and male ????
router.post('/signup', function(request, response) {

	const firstName = request.body.firstName
	const lastName = request.body.lastName
	const password = request.body.password
	const email = request.body.email
	const phoneNumber = request.body.phoneNumber
	const birthDay = request.body.birthday
	const male = request.body.male
	//const female = request.body.female

	const account = [firstName, lastName, password, email, phoneNumber, birthDay, male]

	accountManager.createAccount(account, function(error) {
		
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

module.exports = router