//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// do we need to somehow update the fields after you have sent a post??????
function createPost(post) {   
  
    fetch(
        "http://192.168.99.100:8080/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.accessToken
            },
            body: JSON.stringify(post)
        }
    )
    
    .then(function(response) {

        if (response.status == 500) {
            const div = document.querySelector("#create-post-page div")
            const p = document.createElement("p")
            p.innerText = "The request failed with the following status code: " + response.status
            div.appendChild(p)
        }

        else if (response.status == 400) {
            const div = document.querySelector("#create-post-page div")
            const p = document.createElement("p")
            p.innerText = "The request failed with the following status code: " + response.status
            div.appendChild(p)
        }

        else if (response.status == 401) {
            const div = document.querySelector("#create-post-page div")
            const p = document.createElement("p")
            p.innerText = "The request failed with the following status code: " + response.status
            div.appendChild(p)
        }    
    }).catch(function(error) {
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
            
            // create an href instead of a button that will lead to another page, pass id onto that link
            // split it and send it to the fetch method for delete.
			for(const post of data.posts) {			
		
				//creating li for each post
                const li = document.createElement("li")

				//Adding info text to li
				const p = document.createElement("p")
				p.innerText = "Title: " + post.title + "\nContent: " + post.content 
                li.appendChild(p)
          
                //Adding a form with class "delete-post-form" 
                // const form = document.createElement("form")
                // const deleteButton = document.createElement("button")
                
                // form.classList.add("delete-post-form")
                
                // deleteButton.innerText = "Delete"
                // deleteButton.classList.add("showIfLoggedIn")
                // deleteButton.type = "submit"
                // deleteButton.value = post.postID

                // form.appendChild(deleteButton)
                // li.appendChild(form)
         

                const anchor = document.createElement("a")
                anchor.innerText = "Go to post"
                anchor.setAttribute("href", '/posts/'+post.postID)
                
                li.appendChild(anchor)
				ul.append(li)
			}
		
		}).catch(function(error) {	
		console.log(error)
	})
}

// function deletePost(postID) {
//     console.log("inside delete post function")
//     fetch(
//         "http://192.168.99.100:8080/posts/"+postID, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer "+localStorage.accessToken
//             }, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
//             // do we need a body in delete? no??
        
//         }).then(function(response) {
//             console.log(response)

//             if (response.status == 500) {
//                 const div = document.querySelector("#post-page div")
//                 const p = document.createElement("p")
//                 p.innerText = "The request failed with the following status code: " + response.status
//                 div.appendChild(p)
//             }
    
//             else if (response.status == 400) {
//                 const div = document.querySelector("#post-page div")
//                 const p = document.createElement("p")
//                 p.innerText = "The request failed with the following status code: " + response.status
//                 div.appendChild(p)
//             }
    
//             else if (response.status == 401) {
//                 const div = document.querySelector("#post-page div")
//                 const p = document.createElement("p")
//                 p.innerText = "The request failed with the following status code: " + response.status
//                 div.appendChild(p)
//             }

//         }).catch(function(error) {
//         console.log(error)
//     })
// }



function fetchPet(id){
	
	fetch(
		"http://localhost:8080/pets/"+id
	).then(function(response) {
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
                const div = document.querySelector("#create-post-page div")
				const p = document.createElement("p")
				p.innerText = "The request failed with the following status code: " + response.status
				div.appendChild(p)
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
            console.log(error) 
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function putAllLocationsInForm() {
    fetch(
        "http://192.168.99.100:8080/locations", {

        }).then(function(response) {
            
            if (response.status != 200) {
				const div = document.querySelector("#create-post-page div")
				const p = document.createElement("p")
				p.innerText = "The request failed with the following status code: " + response.status
				div.appendChild(p)
            }
            return response.json()
        
        }).then(function(data) {
            
            const selectLocation = document.querySelector("#location-select")

            for (const location of data.locations) {

                const option = document.createElement("option")

                option.value = location.locationID
                option.text = location.location

                selectLocation.appendChild(option)
            } 

        }).catch(function(error) {
        console.log(error)
    })
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

