const MIN_TITLE_LENGTH = 3
const MAX_TITLE_LENGTH = 20

const MIN_CONTENT_LENGTH = 3
const MAX_CONTENT_LENGTH = 100

const MIN_EMAIL_LENGTH = 3
const MAX_EMAIL_LENGTH = 100

module.exports = function ({ }) {

    return {

        getErrorsForCreateContactMessage: function (title, content, email) {

            const validationErrors = []
            const titleLength = title.length
            const contentLength = content.length
            const emailLength = email.length

            if (titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH) {
                validationErrors.push("Invalid length for title. Please type a title consisting of " + MIN_TITLE_LENGTH + " - " + MAX_TITLE_LENGTH + " characters. Current length of title: " + titleLength + ".")
            }

            if (contentLength < MIN_CONTENT_LENGTH || contentLength > MAX_CONTENT_LENGTH) {
                validationErrors.push("Invalid length for message. Please type a message consisting of " + MIN_CONTENT_LENGTH + " - " + MAX_CONTENT_LENGTH + " characters. Current length of message: " + contentLength + ".")
            }

            if (emailLength < MIN_EMAIL_LENGTH || emailLength > MAX_EMAIL_LENGTH) {
                validationErrors.push("Invalid length for email. Please type an email consisting of " + MIN_EMAIL_LENGTH + " - " + MAX_EMAIL_LENGTH + " characters. Current length of email: " + emailLength + ".")
            }

            if (!email.includes("@")) {
                validationErrors.push("Invalid email address, must contain '@'.")
            }

            return validationErrors
        }
    }
}