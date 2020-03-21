
async function putAllCategoriesInForm() {

    const categorySelect = document.querySelector("#category-select")
    categorySelect.innerText = ""

    try {
    
        const response = await fetch("http://192.168.99.100:8080/categories", {})
            
        if (response.status != 200) {
            document.getElementById("create-post-output-paragraph").innerText = "The get request for getting category options failed due to database error."
        }
        
        const data = await response.json()

        for (const category of data.categories) {

            const option = document.createElement("option")

            option.value = category.categoryID
            option.text = category.category

            categorySelect.appendChild(option)
        } 
      
    }
        
    catch(error) {
        console.log(error) 
    }
}