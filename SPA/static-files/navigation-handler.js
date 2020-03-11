
// TODO: Don't write all JS code in the same file.
document.addEventListener("DOMContentLoaded", function() {

	//Move this to account-handler
	changeToPage(location.pathname)
	
	if (localStorage.accessToken) {
		login(localStorage.accessToken)
    }
    else {
		logout()
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//stay here??
	document.body.addEventListener("click", function(event) {
		if(event.target.tagName == "A") {
			event.preventDefault()
			const url = event.target.getAttribute("href")
			goToPage(url)
		}
	})
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Not sure what this does? but seem to stay here
	window.addEventListener("popstate", function(event){
		const url = location.pathname
		this.console.log(url)
		changeToPage(url)
	})

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//not sure what this does but seem to stay here
	function goToPage(url) { 
		changeToPage(url)
		history.pushState({}, "", url)
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function removeCurrentPage() {	
		const currentPageDiv = document.getElementsByClassName("current-page")[0]
		
		if(currentPageDiv) {
			currentPageDiv.classList.remove("current-page")
		}	
	}


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// stay here
	
	function changeToPage(url) {
		
		removeCurrentPage()
		
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


		else{
			document.getElementById("error-page").classList.add("current-page")
		}
		
	}


		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		document.querySelector("#login-page form").addEventListener("submit", function(event) {
			event.preventDefault()
		
			const email = document.querySelector("#login-page .username").value
			const password = document.querySelector("#login-page .password").value
		
			getTokensAndLogin(email, password)
		})
	
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		document.querySelector("#create-post-page form").addEventListener("submit", function(event) {
			event.preventDefault()
			
			const title = document.querySelector("#create-post-page .title").value
			const content = document.querySelector("#create-post-page .content").value
			const categoryID = document.querySelector("#create-post-page .categoryID").value
			const locationID = document.querySelector("#create-post-page .locationID").value
	
			const accessToken = localStorage.accessToken
			
			const post = {
				title,
				content,
				categoryID,
				locationID
			}
			
			createPost(post, accessToken)
			
		})

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		document.querySelector("#goToCreatePostButton").addEventListener("click", function(event) {
			event.preventDefault()

			removeCurrentPage()
			
			document.getElementById("create-post-page").classList.add("current-page")


			putAllCategoriesInForm()

			putAllLocationsInForm()

		})

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})
	
