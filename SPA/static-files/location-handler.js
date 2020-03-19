async function putAllLocationsInForm() {
    
    try {
    
        const response = await fetch("http://192.168.99.100:8080/locations", {})
        
        
        if (response.status != 200) {
            document.getElementById("create-post-output-paragraph").innerText = "The get request for getting location options failed due to database error."
        }
        
        const data = await response.json()

        const locationSelect = document.querySelector("#location-select")

        for (const location of data.locations) {

            const option = document.createElement("option")

            option.value = location.locationID
            option.text = location.location

            locationSelect.appendChild(option)
        } 



    }
        
    catch(error) {
        console.log(error)
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

