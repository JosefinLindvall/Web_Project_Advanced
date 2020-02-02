const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require("body-parser")

const app = express()

const accountRouter = require('./routers/account-router')
const variousRouter = require('./routers/various-router')
const postRouter = require('./routers/post-router')
const contactMessageRouter = require('./routers/contact-message-router')

// Handle static files in the public folder.
app.use(express.static(__dirname + "/public"))

// Setup express-handlebars.
app.set("views", "src/pl/views")

app.engine("hbs", expressHandlebars({
    defaultLayout: "main.hbs"
}))

app.use(bodyParser.urlencoded({
    extended: false
}))

// Attach all routers.
app.use("/account", accountRouter)
app.use("/", variousRouter)
app.use("/create-post", postRouter)
app.use("/contact-messages", contactMessageRouter)

app.get('/support', function (request, response) {
    response.render("support.hbs")
})

app.get('/view-messages', function (request, response) {
    response.render("viewMessages.hbs")
})

app.get('/search-posts', function (request, response) {
    response.render("searchPosts.hbs")
})

app.get('/search-posts', function (request, response) {

    const categories = ["hiking", "fishing", "bowling"] //where to store this array??
    const locations = ["Eksjö", "Jönköping", "Örebro"] //where to store this array??

    const model = {
        categories,
        locations
    }
    response.render("searchPosts.hbs", model)
})

// Start listening for incoming HTTP requests!
app.listen(8080, function () {
    console.log('Web application listening on port 8080')
})