// Move to account-handler
function login(accessToken, typeOfUser) {
	
	localStorage.accessToken = accessToken
	document.body.classList.remove("isLoggedOut")
	
	if (typeOfUser == "Admin") {
		document.body.classList.add("isLoggedInAsAdmin")
	}
	
	else {	
		document.body.classList.add("isLoggedInAsUser")
	}
}

// Move to account-handler
function logout() {
	localStorage.accessToken = ""
	localStorage.typeOfUser = ""

	document.body.classList.remove("isLoggedInAsAdmin") //krashar detta om bodyn inte har denna klassen???
	document.body.classList.remove("isLoggedInAsUser")
	document.body.classList.add("isLoggedOut")
}




