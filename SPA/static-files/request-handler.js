//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function createPost(post) {      
    fetch(
        "http://localhost:8080/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.accessToken
            },
            body: JSON.stringify(pet)
        }
    ).then(function(response) {
        // TODO: Check status code to see if it succeeded. Display errors if it failed.
        // TODO: Update the view somehow.
        console.log(response)
    }).catch(function(error) {
        // TODO: Update the view and display error.
        console.log(error)
    })
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function fetchSixLatestPosts() {
	
	fetch(
		"http://192.168.99.100:8080/posts" //get req by default?	
			
		).then(function(response) {
		
			// TODO: Check status code to see if it succeeded. Display errors if it failed.
			if (response.status != 200) {
				const div = document.querySelector("#posts-page div")
				const p = document.createElement("p")
				p.innerText = "The request failed with the following status code: " + response.status
				div.appendChild(p)
			}
			
			return response.json()
		
		}).then(function(data) {

			const ul = document.querySelector("#posts-page ul")
			ul.innerText = ""
			
			for(const post of data.posts) {			
			

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
		
		}).catch(function(error) {	
		console.log(error)
	})
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
        
        }).then(function(response){

            // TODO: Check status code to see if it succeeded. Display errors if it failed.
            return response.json()
        
        }).then(function(body){
            // TODO: Read out information about the user account from the id_token.	
            login(body.access_token, body.typeOfUser)
        
        }).catch(function(error) {
        console.log(error)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function putAllCategoriesInForm() {
    fetch(
        "http://192.168.99.100:8080/categories", {
            
        }).then(function(response) {

            if (response.status != 200) {
				// db error
            }
            
            return response.json()
        
        }).then(function(data) {
            const selectCategory = document.querySelector("#category-select")

            for (const category of data.categories) {

                const option = document.createElement("option")

                option.value = category.categoryID
                option.text = category.category

                selectCategory.appendChild(option)
            } 

        }).catch(function(error) {
            // do something 
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function putAllLocationsInForm() {
    fetch(
        "http://192.168.99.100:8080/locations", {

        }).then(function(response) {
            // TODO: Check status code to see if it succeeded. Display errors if it failed.
            
            if (response.status != 200) {
				// db error
            }
            
            return response.json()
        
        }).then(function(data) {
            // TODO: Read out information about the user account from the id_token.	
          
        
        }).catch(function(error) {
        console.log(error)
    })
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

