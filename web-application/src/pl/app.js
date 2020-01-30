const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require("body-parser")

const app = express()

app.use(express.static(__dirname + "/public"))

app.set("views", "src/pl/views")

app.engine("hbs", expressHandlebars({
    defaultLayout: "main.hbs"
}))

app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', function (request, response) {
    response.render("home.hbs")
})

app.get('/home', function (request, response) {
    response.render("home.hbs")
})

app.get('/login', function(request, response) {
    response.render("login.hbs")
})

app.get('/signup', function(request, response) {
    response.render("signUp.hbs")
})

app.get('/create-post', function(request, response) {
    response.render("createPost.hbs")
})

app.get('/profile', function(request, response) {
    response.render("profile.hbs")
})


app.get('/about-us', function(request, response) {
    response.render("about.hbs")
})


app.get('/support', function(request, response) {
    response.render("support.hbs")
})


app.get('/view-messages', function(request, response) {
    response.render("viewMessages.hbs")
})


app.get('/search-posts', function(request, response) {
    response.render("searchPosts.hbs")
})

app.listen(8080, function () {
    console.log('Web application listening on port 8080')
})