

module.exports = function ({ }) {

	return {

		/////////////////////////////////////////////////////////////////////////////////////////////
		getErrorsNewAccount: function (account) {

			MIN_FIRSTNAME_LENGTH = 2
			MAX_FIRSTNAME_LENGTH = 15
			MIN_LASTNAME_LENGTH = 2
			MAX_LASTNAME_LENGTH = 30

			const errors = []
			let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

			firstName = account.firstName
			lastName = account.lastName
			email = account.email
			phoneNumber = account.phoneNumber

			if (firstName == "") {
				errors.push("Firstname can't be empty")
			}
			else if (firstName.length < MIN_FIRSTNAME_LENGTH) {
				errors.push("Firstname can't be less than 2 characters")
			}
			else if (firstName.length > MAX_FIRSTNAME_LENGTH) {
				errors.push("Firstname can't be more than 15 characters")
			}

			if (!firstName.match('^[A-Za-z]*$')) {
				errors.push("Firstname can't consist of digits!")
			}

			if (lastName == "") {
				errors.push("Lastname can't be empty")
			}
			else if (lastName.length < MIN_LASTNAME_LENGTH) {
				errors.push("Lastname can't be less than 2 characters")
			}
			else if (lastName.length > MAX_LASTNAME_LENGTH) {
				errors.push("Lastname can't be more than 30 characters")
			}

			if (!lastName.match('^[A-Za-z]*$')) {
				errors.push("Firstname can't consist of digits!")
			}

			if (email == "") {
				errors.push("Email field can't be empty!")
			}

			if (!phoneNumber.match(phoneno)) {
				errors.push("Need to enter a valid phone number")
			}
			return errors
		},

		/////////////////////////////////////////////////////////////////////////////////////////////
		checkAccountInformation: function (typedEmail, typedPassword) {
			const errors = []

			if (typedEmail == "") {
				errors.push("Email field can't be empty!")
			}

			if (typedPassword == "") {
				errors.push("Password field can't be empty!")
			}
			return errors
		}
	}
}
