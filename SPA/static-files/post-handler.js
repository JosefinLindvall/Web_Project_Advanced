
async function createPost(post) {

    try {
        const response = await fetch(
            "http://192.168.99.100:8080/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.accessToken
            },
            body: JSON.stringify(post)
        })

        const p = document.getElementById("create-post-output-paragraph")
        ul = document.getElementById("create-post-validation-ul")
        
        hideValidationErrors(ul)

        switch (response.status) {
            case 201:
                p.innerText = "Successfully created post!"
                break
            case 401:
                p.innerText = "You are not logged in and are unauthorized to create a post! Please log in or sign up for an account at Friendy!"
                break
            case 500:
                p.innerText = "Could not create post due to database error."
                break
            case 400:
                const validationErrors = await response.json()
                showValidationErrors(validationErrors, ul)
                break
            default:
                p.innerText = "Received unexpected status code: " + response.statuscode
        }

    }
     
    catch(error) {
        console.log(error)
    }
}

async function fetchPost(id) {

    try {

        const response = await fetch("http://192.168.99.100:8080/posts/" + id)

        if (response.status == 500) {
            document.getElementById("post-output-paragraph").innerText = "Could not fetch post due to database error."
        }

        const data = await response.json()
     
        const postTitle = data.post.title
        const postContent = data.post.content
        const postID = data.post.postID
        
        document.getElementById("post-title-p").innerText = postTitle
        document.querySelector("#post-content-p").innerText = postContent
        document.querySelector("#delete-post-a").href = "/delete-post/" + postID
        document.querySelector("#update-post-a").href = "/update-post/" + postID
    }

    catch (error) {
        console.log(error)
    }

}

async function fetchSixLatestPosts() {

    try {
        
        const response = await fetch("http://192.168.99.100:8080/posts", {})

        if (response.status == 500) {
            document.getElementById("posts-output-paragraph").innerText = "Could not fetch posts due to database error."
        }

        const data = await response.json()

        const ul = document.querySelector("#posts-page ul")

        ul.innerText = ""

        for (const post of data.posts) {

            const li = document.createElement("li")
            const p = document.createElement("p")
            
            p.innerText = "Title: " + post.title + "\nContent: " + post.content
            li.appendChild(p)

            const anchor = document.createElement("a")
            
            anchor.innerText = "Go to post"
            anchor.setAttribute("href", "/posts/" + post.postID)
            
            li.appendChild(anchor)
            ul.append(li)
        }
    }

    catch(error) {
        console.log(error)
    }
}

async function deletePost(postID) {

    try {

        const response = await fetch(
            "http://192.168.99.100:8080/posts/" + postID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }) 

        p = document.getElementById("post-output-paragraph")

        switch (response.status) {
            case 204:
                p.innerText = "Successfully deleted post!"
                break
            case 401:
                p.innerText = "You are not authorized to delete this post! This action is only available for admin users."
                break
            case 500:
                p.innerText = "Failed to delete post due to database error."
                break
            default:
                p.innerText = "Received unexpected status code: " + response.statuscode

        }
    }
    catch (error) {
        console.log(error)
    }
}

async function updatePost(postID, updatedPost) {
    
    try {
        
        const response = await fetch(
        "http://192.168.99.100:8080/posts/" + postID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.accessToken
            },
            
            body: JSON.stringify(updatedPost)
            
        })

        const p = document.getElementById("update-post-output-paragraph")
        ul = document.getElementById("update-post-validation-ul")
        hideValidationErrors(ul)

        switch (response.status) {
            case 204:
                p.innerText = "Update was successful!"
                break
            case 500:
                p.innerText = "Update failed because of database error."
                break
            case 401:
                p.innerText = "You are not authorized to update this post! This action is only available for admin users."
                break
            case 400:
                const validationErrors = await response.json()
                showValidationErrors(validationErrors, ul)
                break
            default:
                p.innerText = "Received unexpected status code: " + response.statuscode
        }
    }

    catch (error) {
        console.log(error)
    }
}