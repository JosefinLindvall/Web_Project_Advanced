
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
	
	document.body.addEventListener("click", function(event) {
		if(event.target.tagName == "A") {
			event.preventDefault()
			const url = event.target.getAttribute("href")
			goToPage(url)
		}
	})
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	window.addEventListener("popstate", function(event){
		const url = location.pathname
		this.console.log(url)
		changeToPage(url)
	})

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

		else if (new RegExp("^/posts/[0-9]+$").test(url)) {
			document.getElementById("post-page").classList.add("current-page")
			const id = url.split("/")[2]
			fetchPet(id)
		}

		else {
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
		
			const post = {
				title,
				content,
				categoryID,
				locationID
			}
			
			createPost(post)
		})

		// document.querySelector(".delete-post-form").addEventListener("submit", function(event) {
		// 	event.preventDefault()
			
		// 	console.log("you clicked on a delete button")
		// 	deletePost()
			
		// })

	

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//
		document.querySelector("#goToCreatePostButton").addEventListener("click", function(event) {
			event.preventDefault()

			removeCurrentPage()
			
			document.getElementById("create-post-page").classList.add("current-page")

			putAllLocationsInForm()
			putAllCategoriesInForm()
		})


		// The problem is that he can't find the class that we created dynamically because DOM-content
		// doesn't wait for us to create this....
		// document.querySelector("#delete-div").addEventListener("submit", function(event) {
		// 	event.preventDefault()
			
		// 	const postID = document.querySelector(".delete-post-form button").value
		// 	console.log(postID)

		// 	deletePost(postID)
		// })

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})
	
