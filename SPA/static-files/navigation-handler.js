
document.addEventListener("DOMContentLoaded", function () {

	//////////   HANDLING NAVIGATION      ///////////////////////////////////////////////////////////////////////////////////////////
	changeToPage(location.pathname)

	if (localStorage.accessToken && localStorage.idToken) {
		login(localStorage.accessToken, localStorage.idToken)
	}
	else {
		logout()
	}

	document.body.addEventListener("click", function (event) {
		if (event.target.tagName == "A") {
			event.preventDefault()
			const url = event.target.getAttribute("href")
			goToPage(url)
		}
	})

	window.addEventListener("popstate", function (event) {
		const url = location.pathname
		changeToPage(url)
	})

	function goToPage(url) {
		changeToPage(url)
		history.pushState({}, "", url)
	}

	function removeCurrentPage() {
		const currentPageDiv = document.getElementsByClassName("current-page")[0]

		if (currentPageDiv) {
			currentPageDiv.classList.remove("current-page")
		}
	}

	function changeToPage(url) {

		removeCurrentPage()

		if (url == "/") {
			document.getElementById("home-page").classList.add("current-page")
		}

		else if (url == "/about") {
			document.getElementById("about-page").classList.add("current-page")
		}

		else if (url == "/posts") {
			document.getElementById("posts-output-paragraph").innerText = ""
			document.getElementById("posts-page").classList.add("current-page")

			fetchSixLatestPosts()
		}

		else if (url == "/login") {
			document.getElementById("login-output-paragraph").innerText = ""
			document.getElementById("login-page").classList.add("current-page")
		}

		else if (url == "/signup") {
			document.getElementById("signup-output-paragraph").innerText = ""
			document.getElementById("signup-validation-ul").innerText = ""
			document.getElementById("signup-page").classList.add("current-page")
		}

		else if (url == "/logout") {
			document.getElementById("home-page").classList.add("current-page")
			logout()
		}

		else if (new RegExp("^/posts/[0-9]+$").test(url)) {
			document.getElementById("post-output-paragraph").innerText = ""
			document.getElementById("post-page").classList.add("current-page")

			const id = url.split("/")[2]
			fetchPost(id)
		}

		else if (new RegExp("^/delete-post/[0-9]+$").test(url)) {
			document.getElementById("post-output-paragraph").innerText = ""
			const id = url.split("/")[2]
			deletePost(id)
		}

		else if (new RegExp("^/update-post/[0-9]+$").test(url)) {
			document.getElementById("update-post-output-paragraph").innerText = ""
			document.getElementById("update-post-validation-ul").innerText = ""
			document.getElementById("update-post-page").classList.add("current-page")

			const postID = url.split("/")[2]
			document.getElementById("update-post-page-id-input").value = postID
			document.getElementById("update-post-page-id-specifier-h3").innerText = "with id " + postID
		}

		else {
			document.getElementById("error-page").classList.add("current-page")
		}
	}


	//////////   EVENT LISTENERS FOR FORMS      //////////////////////////////////////////////////////////////////////////////////////
	document.querySelector("#login-page form").addEventListener("submit", function (event) {
		event.preventDefault()

		const email = document.querySelector("#login-page .email").value
		const password = document.querySelector("#login-page .password").value

		getTokensAndLogin(email, password)
	})

	document.querySelector("#signup-page form").addEventListener("submit", function (event) {
		event.preventDefault()

		const firstName = document.querySelector("#signup-page .firstName").value
		const lastName = document.querySelector("#signup-page .lastName").value
		const email = document.querySelector("#signup-page .email").value
		const password = document.querySelector("#signup-page .password").value
		const phoneNumber = document.querySelector("#signup-page .phoneNumber").value
		const gender = document.querySelector("#signup-page .gender").value
		const birthday = document.querySelector("#signup-page .birthday").value

		newAccount = { firstName, lastName, email, password, phoneNumber, gender, birthday }

		signUp(newAccount)
	})

	document.querySelector("#create-post-page form").addEventListener("submit", function (event) {
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

	document.querySelector("#update-post-page form").addEventListener("submit", function (event) {
		event.preventDefault()

		const postID = document.querySelector("#update-post-page .id").value
		const title = document.querySelector("#update-post-page .title").value
		const content = document.querySelector("#update-post-page .content").value

		const updatedPost = {
			title,
			content
		}

		updatePost(postID, updatedPost)
	})


	//////////   EVENT LISTENERS FOR BUTTONS      ///////////////////////////////////////////////////////////////////////////////////
	document.querySelector("#goToCreatePostButton").addEventListener("click", function (event) {
		event.preventDefault()

		document.getElementById("create-post-output-paragraph").innerText = ""

		removeCurrentPage()
		document.getElementById("create-post-page").classList.add("current-page")

		putAllLocationsInForm()
		putAllCategoriesInForm()
	})

})