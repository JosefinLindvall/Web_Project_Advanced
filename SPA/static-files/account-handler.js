//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function logout() {
	localStorage.accessToken = ""
	localStorage.typeOfUser = ""

	document.body.classList.remove("isLoggedInAsAdmin") //krashar detta om bodyn inte har denna klassen???
	document.body.classList.remove("isLoggedInAsUser")
	document.body.classList.add("isLoggedOut")
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getTokensAndLogin (email, password) {

    fetch(
        "http://192.168.99.100:8080/tokens", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
            body: "grant_type=password&email="+email+"&password="+password
        
        })
        
	.then(function(response){

		// TODO: Check status code to see if it succeeded. Display errors if it failed.
		return response.json()
	
	})
	
	.then(function(body){
		// TODO: Read out information about the user account from the id_token.	
		login(body.access_token, body.typeOfUser)
	
	})
	
	.catch(function(error) {
		console.log(error)
	})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function signUp (newAccount) {

	fetch(
        "http://192.168.99.100:8080/accounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }, 
            body: JSON.stringify(newAccount)
        
		}
	)
        
	.then(function(response){

		const p = document.getElementById("signup-output-paragraph")

		if (response == 201) {
			p.innerText = "Success creating account!"
		}

		else if (response == 400) {
			p.innerText = "Could not create account due to validation errors. Please make sure that..." //list validation requirements here?
		}

		else {
			p.innerText = "Could not create account due to database error."
		}

		return response.json()
	
	})
	
	.catch(function(error) {
		console.log(error)
	})
}






