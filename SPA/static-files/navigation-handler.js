// TODO: Don't write all JS code in the same file.
document.addEventListener("DOMContentLoaded", function(){
	
	changeToPage(location.pathname)
	
	if(localStorage.accessToken){
		login(localStorage.accessToken)
	}else{
		logout()
	}
	
	document.body.addEventListener("click", function(event){
		if(event.target.tagName == "A"){
			event.preventDefault()
			const url = event.target.getAttribute("href")
			goToPage(url)
		}
	})
	
	// TODO: Avoid using this long lines of code.
	document.querySelector("#create-pet-page form").addEventListener("submit", function(event){
		event.preventDefault()
		
		const name = document.querySelector("#create-pet-page .name").value
		
		const pet = {
			name
		}
		
		// TODO: Build an SDK (e.g. a separate JS file)
		// handling the communication with the backend.
		fetch(
			"http://localhost:8080/pets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer "+localStorage.accessToken
				},
				body: JSON.stringify(pet)
			}
		).then(function(response){
			// TODO: Check status code to see if it succeeded. Display errors if it failed.
			// TODO: Update the view somehow.
			console.log(response)
		}).catch(function(error){
			// TODO: Update the view and display error.
			console.log(error)
		})
		
	})
	
	document.querySelector("#login-page form").addEventListener("submit", function(event){
		event.preventDefault()
		
		const username = document.querySelector("#login-page .username").value
		const password = document.querySelector("#login-page .password").value
		
		fetch(
			"http://localhost:8080/tokens", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
				body: "grant_type=password&username="+username+"&password="+password
			}
			).then(function(response){
				// TODO: Check status code to see if it succeeded. Display errors if it failed.
				return response.json()
			}).then(function(body){
				// TODO: Read out information about the user account from the id_token.
				login(body.access_token)
				console.log(accessToken)
		}).catch(function(error){
			console.log(error)
		})
		
	})
	
})

window.addEventListener("popstate", function(event){
	const url = location.pathname
	changeToPage(url)
})

function goToPage(url){
	
	changeToPage(url)
	history.pushState({}, "", url)
	
}

function changeToPage(url){
	
	const currentPageDiv = document.getElementsByClassName("current-page")[0]
	if(currentPageDiv){
		currentPageDiv.classList.remove("current-page")
	}
	
	// TODO: Optimally this information can be put in an array instead of having a long list of if-else if statements.
	// TODO: Factor out common code in all branches.
	if(url == "/"){
		document.getElementById("home-page").classList.add("current-page")
	}else if(url == "/about"){
		document.getElementById("about-page").classList.add("current-page")
	}else if(url == "/pets"){
		document.getElementById("pets-page").classList.add("current-page")
		fetchAllPets()
	}else if(url == "/login"){
		document.getElementById("login-page").classList.add("current-page")
	}else if(new RegExp("^/pets/[0-9]+$").test(url)){
		document.getElementById("pet-page").classList.add("current-page")
		const id = url.split("/")[2]
		fetchPet(id)
	}else if(url == "/create-pet"){
		document.getElementById("create-pet-page").classList.add("current-page")
	}else{
		document.getElementById("error-page").classList.add("current-page")
	}
	
}

function fetchAllPets(){
	
	fetch(
		"http://localhost:8080/pets"
	).then(function(response){
		// TODO: Check status code to see if it succeeded. Display errors if it failed.
		return response.json()
	}).then(function(pets){
		const ul = document.querySelector("#pets-page ul")
		ul.innerText = ""
		for(const pet of pets){
			const li = document.createElement("li")
			const anchor = document.createElement("a")
			anchor.innerText = pet.name
			anchor.setAttribute("href", '/pets/'+pet.id)
			li.appendChild(anchor)
			ul.append(li)
		}
	}).catch(function(error){
		console.log(error)
	})
	
}

function fetchPet(id){
	
	fetch(
		"http://localhost:8080/pets/"+id
	).then(function(response){
		// TODO: Check status code to see if it succeeded. Display errors if it failed.
		return response.json()
	}).then(function(pet){
		const nameSpan = document.querySelector("#pet-page .name")
		const idSpan = document.querySelector("#pet-page .id")
		nameSpan.innerText = pet.name
		idSpan.innerText = pet.id
	}).catch(function(error){
		console.log(error)
	})
	
}

function login(accessToken){
	localStorage.accessToken = accessToken
	document.body.classList.remove("isLoggedOut")
	document.body.classList.add("isLoggedIn")
}

function logout(){
	localStorage.accessToken = ""
	document.body.classList.remove("isLoggedIn")
	document.body.classList.add("isLoggedOut")
}