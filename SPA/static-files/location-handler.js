function putAllLocationsInForm() {
    fetch(
        "http://192.168.99.100:8080/locations", {

        })
        
        .then(function(response) {
            
            if (response.status != 200) {
                document.getElementById("create-post-output-paragraph").innerText = "The get request for getting location options failed due to database error."
            }
            
            return response.json()
        
        })
        
        .then(function(data) {
            
            const selectLocation = document.querySelector("#location-select")

            for (const location of data.locations) {

                const option = document.createElement("option")

                option.value = location.locationID
                option.text = location.location

                selectLocation.appendChild(option)
            } 

        })
        
        .catch(function(error) {
            console.log(error)
    })
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

