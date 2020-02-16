const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

const accountRouter = require('./routers/account-router')
const variousRouter = require('./routers/various-router')
const postRouter = require('./routers/post-router')
const contactMessageRouter = require('./routers/contact-message-router')
const redis = require('redis')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

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

// The function "session" creates random session ids from the secret below
app.use(session({
    saveUninitialized: false, 
    resave: false,
    secret: 'ksdjfhjksbajshklbvcsaelv',
    store: new RedisStore({ client: redisClient })
}))

// Attach all routers.
app.use("/account", accountRouter)
app.use("/", variousRouter)
app.use("/post", postRouter)
app.use("/contact-message", contactMessageRouter)


// Start listening for incoming HTTP requests!
app.listen(8080, function () {
    console.log('Web application listening on port 8080')
})