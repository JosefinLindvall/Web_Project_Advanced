//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function login(accessToken, idToken) {

	localStorage.accessToken = accessToken
	localStorage.idToken = idToken

	document.body.classList.remove("isLoggedOut")

	const typeOfUser = JSON.parse(atob(idToken.split('.')[1])).typeOfUser

	
	if (typeOfUser == "Admin") {
		document.body.classList.add("isLoggedInAsAdmin")
	}
	
	else {	
		document.body.classList.add("isLoggedInAsUser")
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function logout() {
	localStorage.accessToken = ""
	localStorage.typeOfUser = ""

	document.body.classList.remove("isLoggedInAsAdmin") //krashar detta om bodyn inte har denna klassen???
	document.body.classList.remove("isLoggedInAsUser")
	document.body.classList.add("isLoggedOut")
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function getTokensAndLogin (email, password) {

	try {

		const response = await fetch(
			"http://192.168.99.100:8080/tokens", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
				body: "grant_type=password&email="+encodeURIComponent(email)+"&password="+encodeURIComponent(password)
			}
		)
		
		
		p = document.getElementById("login-output-paragraph")
		ul = document.getElementById("login-validation-ul")
		hideValidationErrors(ul)

		const data = await response.json()
		switch(response.status) {
			case 202:
				p.innerText = "Successfully logged in!"
				console.log(data.id_token)
				login(data.access_token, data.id_token)
				break
			case 500:
				p.innerText = "Could not log in due to database error."
				break
			case 400:
				const validationErrors = data.errors
				showValidationErrors(ul, validationErrors)
				break
			default:
				p.innerText = "Received unexpected status code: " + response.statuscode
		}
	
	}
	
	catch(error) {
		p = "Error logging in."
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function signUp (newAccount) {
	
	try {
		
		const response = await fetch(
			"http://192.168.99.100:8080/accounts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}, 
			body: JSON.stringify(newAccount)
			
			}
		)

		const p = document.getElementById("signup-output-paragraph")
		ul = document.getElementById("signup-validation-ul")
		hideValidationErrors(ul)

		switch (response.status) {
			case 201:
				p.innerText = "Successfully created account!"
				break
			case 500:
				p.innerText = "Database error when creating account. This could be beacuse the email entered already belongs to an account."
				break
			case 400:
				const validationErrors = await response.json()
				showValidationErrors(validationErrors, ul)
				break
			default:
				p.innerText = "Received unexpected status code: " + response.statuscode
				break
		}

	}
	
	catch(error) {
		console.log(error)
	}
}






