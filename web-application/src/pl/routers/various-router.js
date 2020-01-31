const express = require('express')

const router = express.Router()

router.get('/', function (request, response) {
    response.render("home.hbs")
})

router.get('/home', function (request, response) {
    response.render("home.hbs")
})

router.get('/about-us', function(request, response) {
    response.render("about.hbs")
})

module.exports = router