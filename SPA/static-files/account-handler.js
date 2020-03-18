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
        
	.then(function(response) {

		console.log(response)
		console.log(response.status)
		console.log()

		p = document.getElementById("login-output-paragraph")

		switch(response.status){
			case 202:
				p = "Successfully logged in!"
				break
			case 500:
				p = "Could not log in due to database error."
				break
			case 400:
				ul = document.getElementById("login-validation-ul")
				break
				//Show errors in ul!
			
			default:
				p.innerText = "Received unexpected status code: " + response.statuscode
		}
		
		return response.json()
	
	})
	
	.then(function(body){
		
		//PUT ID TOKEN IN ACCESS STORAGE HERE
			
		login(body.access_token, body.typeOfUser)
	
	})
	
	.catch(function(error) {
		console.log(error)
		p = "Error logging in."

	})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function signUp (newAccount) {
	console.log("innan rest")
	console.log(newAccount)
	console.log(JSON.stringify(newAccount))
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

		switch (response.status) {
			case 201:
				p.innerText = "Successfully created account!"
				break
			case 500:
				p.innerText = "Failed to create account due to database error."
				break
			case 400:
				ul = document.getElementById("signup-validation-ul")
				break
			default:
				p.innerText = "Received unexpected status code: " + response.statuscode
		}

		return response.json()
	})
	
	.catch(function(error) {
		console.log(error)
	})
}






