//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function createPost(post) {

    fetch(
        "http://192.168.99.100:8080/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.accessToken
        },
        body: JSON.stringify(post)
    }
    )

        .then(function (response) {

            const p = document.getElementById("create-post-output-paragraph")

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
                    ul = document.getElementById("create-post-validation-ul")
                    break
                //Display validation errors here!

                default:
                    p.innerText = "Received unexpected status code: " + response.statuscode
            }

        })

        .catch(function (error) {
            console.log(error)
        })
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fetchPost(id) {

    console.log(id)

    fetch("http://192.168.99.100:8080/posts/" + id)

        .then(function (response) {

            if (response.status == 500) {
                document.getElementById("post-output-paragraph").innerText = "Could not fetch post due to database error."
            }

            return response.json()
        })

        .then(function (data) {

            const postTitle = data.post[0].title
            const postContent = data.post[0].content
            const postID = data.post[0].postID

            document.querySelector("#post-title-p").innerText = postTitle
            document.querySelector("#post-content-p").innerText = postContent
            document.querySelector("#delete-post-a").href = "/delete-post/" + postID
            document.querySelector("#update-post-a").href = "/update-post/" + postID
        })

        .catch(function (error) {
            console.log(error)
        })

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fetchSixLatestPosts() {

    fetch("http://192.168.99.100:8080/posts")

        .then(function (response) {

            if (response.status == 500) {
                document.getElementById("posts-output-paragraph").innerText = "Could not fetch posts due to database error."
            }

            return response.json()

        })

        .then(function (data) {

            const ul = document.querySelector("#posts-page ul")

            ul.innerText = ""

            for (const post of data.posts) {

                //creating li for each post
                const li = document.createElement("li")

                //Adding title and content text to li
                const p = document.createElement("p")
                p.innerText = "Title: " + post.title + "\nContent: " + post.content
                li.appendChild(p)

                // Adding href to li
                const anchor = document.createElement("a")
                anchor.innerText = "Go to post"
                anchor.setAttribute("href", "/posts/" + post.postID)
                li.appendChild(anchor)

                //Appending li to ul
                ul.append(li)
            }

        })

        .catch(function (error) {
            console.log(error)
        })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function deletePost(postID) {


    fetch(

        "http://192.168.99.100:8080/posts/" + postID, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.accessToken
        }
    })

        .then(function (response) {

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

        })

        .catch(function (error) {
            console.log(error)
        })

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function updatePost(postID, updatedPost) {

    fetch(

        "http://192.168.99.100:8080/posts/" + postID, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.accessToken
        },
        body: JSON.stringify(updatedPost)
    })

        .then(function (response) {

            const p = document.getElementById("update-post-output-paragraph")

            console.log(response)
            

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
                    validationErrors = response.errors //This is probably not accurate 
                    ul = document.getElementById("update-post-validation-ul")
                    break
                default:
                    p.innerText = "Received unexpected status code: " + response.statuscode
            }

        })

        .catch(function (error) {
            console.log(error)
        })

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

