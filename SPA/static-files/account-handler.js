//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function login(accessToken, typeOfUser) {

	console.log(typeOfUser)
	console.log(accessToken)
	localStorage.accessToken = accessToken
	document.body.classList.remove("isLoggedOut")
	
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

		console.log ("before fetch")

		const response = await fetch(
			"http://192.168.99.100:8080/tokens", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
				body: "grant_type=password&email="+encodeURIComponent(email)+"&password="+encodeURIComponent(password)
			}
		)
		
		console.log (response.status)

		p = document.getElementById("login-output-paragraph")
		//ul = document.getElementById("login-validation-ul")
		//hideValidationErrors(ul)

		console.log("innan switch")

		switch(response.status){
			case 202:
				console.log("in the 202 case ")
				p = "Successfully logged in!"
				console.log(body.typeOfUser)
				console.log(response.typeOfUser)
				login(body.access_token, body.typeOfUser)
				//PUT ID TOKEN IN ACCESS STORAGE HERE
				break
			case 500:
				p = "Could not log in due to database error."
				break
			case 400:
				const validationErrors = await response.json()
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
		const response = fetch(
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
				p.innerText = "Failed to create account due to database error."
				break
			case 400:
				const validationErrors = await response.json()
				showValidationErrors(validationErrors)
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






