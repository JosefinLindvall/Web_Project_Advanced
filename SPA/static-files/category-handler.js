//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function putAllCategoriesInForm() {
    
    fetch("http://192.168.99.100:8080/categories", {})
        
        .then(function(response) {

            if (response.status != 200) {
                document.getElementById("create-post-output-paragraph").innerText = "The get request for getting category options failed due to database error."
            }
            
            return response.json()
        
        })
        
        .then(function(data) {

            const selectCategory = document.querySelector("#category-select")

            for (const category of data.categories) {

                const option = document.createElement("option")

                option.value = category.categoryID
                option.text = category.category

                selectCategory.appendChild(option)
            } 

        })
        
        .catch(function(error) {
            console.log(error) 
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////