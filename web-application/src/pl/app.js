const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require("body-parser")

const app = express()

app.use(express.static("public"))

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

app.listen(8080, function () {
    console.log('Web application listening on port 8080')
})