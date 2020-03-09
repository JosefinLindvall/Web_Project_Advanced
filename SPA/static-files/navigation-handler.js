// TODO: Don't write all JS code in the same file.
document.addEventListener("DOMContentLoaded", function() {

	changeToPage(location.pathname)
	
	if (localStorage.accessToken) {
		login(localStorage.accessToken)
    }
    else {
		logout()
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	document.body.addEventListener("click", function(event) {
		if(event.target.tagName == "A") {
			event.preventDefault()
			const url = event.target.getAttribute("href")
			goToPage(url)
		}
	})

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	document.querySelector("#create-pet-page form").addEventListener("submit", function(event) {
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	document.querySelector("#login-page form").addEventListener("submit", function(event) {
		event.preventDefault()
	
		const email = document.querySelector("#login-page .username").value
		const password = document.querySelector("#login-page .password").value
		
		console.log(email)
		console.log(password)

		fetch(
			"http://192.168.99.100:8080/tokens", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
				body: "grant_type=password&email="+email+"&password="+password
			})
			
			.then(function(response){
				console.log(response)

				// TODO: Check status code to see if it succeeded. Display errors if it failed.
				return response.json()
			})
			
			.then(function(body){
				// TODO: Read out information about the user account from the id_token.
				console.log(body)
				login(body.access_token, body.typeOfUser)
		})
		
		.catch(function(error) {
			console.log(error)
		})
		
	})
	
})

window.addEventListener("popstate", function(event){
    const url = location.pathname
    this.console.log(url)
	changeToPage(url)
})

function goToPage(url) { 
	
	changeToPage(url)
	history.pushState({}, "", url)
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeToPage(url) {
	
	const currentPageDiv = document.getElementsByClassName("current-page")[0]
	
	if(currentPageDiv) {
		currentPageDiv.classList.remove("current-page")
	}
	
	if (url == "/") {
		document.getElementById("home-page").classList.add("current-page")
    }

    else if (url == "/about") {
		document.getElementById("about-page").classList.add("current-page")
    }

    else if (url == "/posts") {
		document.getElementById("posts-page").classList.add("current-page")
		fetchSixLatestPosts()
    }

    else if (url == "/login") {
		document.getElementById("login-page").classList.add("current-page")
    }

	else if (url == "/logout") {
		document.getElementById("home-page").classList.add("current-page")
		logout()
    }

    else if (new RegExp("^/pets/[0-9]+$").test(url)) {
		document.getElementById("pet-page").classList.add("current-page")
		const id = url.split("/")[2]
		fetchPet(id)
    }

    else if (url == "/create-pet") {
		document.getElementById("create-pet-page").classList.add("current-page")
    }

    else{
		document.getElementById("error-page").classList.add("current-page")
	}
	
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fetchSixLatestPosts() {
	
	fetch(
		"http://192.168.99.100:8080/posts" //get req by default?	
	)
	
	.then(function(response) {
		
		// TODO: Check status code to see if it succeeded. Display errors if it failed.
    
		if (response.status != 200) {
			
			const div = document.querySelector("#posts-page div")
			const p = document.createElement("p")
			p.innerText = "The request failed with the following status code: " + response.status
			div.appendChild(p)
		}
		
		return response.json()
       
    })
    
    .then(function(data) {

        const ul = document.querySelector("#posts-page ul")
		ul.innerText = ""
        
        for(const post of data.posts) {			
			console.log(post)

			//creating li for each post
            const li = document.createElement("li")
			
			//Adding info text to li
			const p = document.createElement("p")
			p.innerText = "Title: " + post.title + "\nContent: " + post.content 
			li.appendChild(p)
			
			//Adding delete button to li
            const deleteButton = document.createElement("button")
			deleteButton.innerText = "Delete"
			deleteButton.classList.add("showIfLoggedIn") //will this work????
			deleteButton.classList.add("deletePostButton")	
			addDeleteActionToButton (post.postID)
			

			//Appending li
			li.appendChild(deleteButton)
            ul.append(li)
		}
    })
    	

    .catch(function(error){
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