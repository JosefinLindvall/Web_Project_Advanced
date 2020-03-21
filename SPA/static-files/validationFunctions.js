//////////   FUNCTIONS FOR VALIDATION      /////////////////////////////////////////////////////////////////////////////////////////
function showValidationErrors(validationErrors, validationUl) {

	for (i = 0; i < validationErrors.length; i++) {
		const liError = document.createElement("li")
		validationUl.appendChild(liError)
		liError.innerText = validationErrors[i]
	}
}

function hideValidationErrors(validationUl) {
    validationUl.innerText = ""
}