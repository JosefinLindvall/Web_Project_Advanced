exports.getErrorsNewAccount = function (account) {

	MIN_FIRSTNAME_LENGTH = 2
	MAX_FIRSTNAME_LENGTH = 15
	MIN_LASTNAME_LENGTH = 2
	MAX_LASTNAME_LENGTH = 30

	const errors = []
	let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  //phone regex that will check for everything except + sign before number. 

	firstName = account.firstName
	lastName = account.lastName
	email = account.email
	phoneNumber = account.phoneNumber

	//validate firstname
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

	//validate lastname
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

	//validate email
	if (email == "") {
		errors.push("Email field can't be empty!")
	}

	//validate phone number
	if (!phoneNumber.match(phoneno)) {
		errors.push("Need to enter a valid phone number")
	}

	return errors
}

//validate account info when you already have one here
exports.checkAccountInformation = function (account) {

	const errors = []

	return errors

}
