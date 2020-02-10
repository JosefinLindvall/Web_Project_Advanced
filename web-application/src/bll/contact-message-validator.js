const MIN_TITLE_LENGTH = 3
const MAX_TITLE_LENGTH = 10

const MIN_CONTENT_LENGTH = 3
const MAX_CONTENT_LENGTH = 10

const MIN_EMAIL_LENGTH = 3
const MAX_EMAIL_LENGTH = 10


exports.getErrorsForCreateContactMessage = function(title, content, email){
	
	const validationErrors = []
	
	
	if(title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH){
		validationErrors.push("Invalid length for title. Please type a title consisting of " + MIN_TITLE_LENGTH+ " - " + MAX_TITLE_LENGTH + " characters.")
    }

    if(content.length < MIN_CONTENT_LENGTH || content.length > MAX_CONTENT_LENGTH){
		validationErrors.push("Invalid length for message. Please type a message consisting of " + MIN_CONTENT_LENGTH + " - "+ MAX_CONTENT_LENGTH + " characters.")
    }
    
    if(email.length < MIN_EMAIL_LENGTH || email.length > MAX_EMAIL_LENGTH){
		validationErrors.push("Invalid length for email. Please type an email consisting of " + MIN_EMAIL_LENGTH + " - " + MAX_EMAIL_LENGTH + " characters.")
    }

    if(!email.includes("@")){
        validationErrors.push("Invalid email adrress, must contain '@'")
    }
	
	return validationErrors
	
}