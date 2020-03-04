
//////// Requiring npm packages ////////////////////////////////////////////////////////////////////////////////
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({ host: "redis" })
const awilix = require('awilix')

const app = express()

//////// Middlewares ////////////////////////////////////////////////////////////////////////////////

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

//////// Handling sessions ////////////////////////////////////////////////////////////////////////////////
app.use(session({  // The function "session" creates random session ids from the secret below

    saveUninitialized: false,
    resave: false,
    secret: 'ksdjfhjksbajshklbvcsaelv',
    store: new RedisStore({ client: redisClient }) //if panic happens; add host:"redis" inside curly brackets


}))

app.use(function (request, response, next) {
    response.locals.isLoggedInAsReg = request.session.isLoggedInAsReg
    response.locals.isLoggedInAsAdmin = request.session.isLoggedInAsAdmin
    //response.locals.accountID = request.session.accountID
    next()
})


//////// AWILIX  //////////////////////////////////////////////////////////////////////////////////////////



// Creating container

const container = awilix.createContainer()


// Requiring functions for the currently used db!

const currentDb = "mySQL" // Set this to "mySQL" or "PostgreSQL"

if (currentDb == "mySQL") {
    var accountRepoFun = require('../dal-MySQL/account-repository') 
    var categoryRepoFun = require('../dal-MySQL/category-repository')
    var contactMessageRepoFun = require('../dal-MySQL/contact-message-repository')
    var locationRepoFun = require('../dal-MySQL/location-repository')
    var postRepoFun = require('../dal-MySQL/post-repository')

}

else if (currentDb == "PostgreSQL") {
    
    const dbFun = require('../dal-PostgreSQL/db')
    container.register('db', awilix.asFunction(dbFun))
    const theDb = container.resolve('db')
    theDb.createAllTables()



    var accountRepoFun = require('../dal-PostgreSQL/account-repository') 
    var categoryRepoFun = require('../dal-PostgreSQL/category-repository')
    var contactMessageRepoFun = require('../dal-PostgreSQL/contact-message-repository')
    var locationRepoFun = require('../dal-PostgreSQL/location-repository')
    var postRepoFun = require('../dal-PostgreSQL/post-repository')

}



// Requiring routers for web application

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const contactMessageRouter = require('./routers/contact-message-router')
const postRouter = require('./routers/post-router')

// Requiring routers for REST API

const variousRouterRestApi = require('../pl-REST-API/routers/various-router')
const accountRouterRestApi = require('../pl-REST-API/routers/account-router')
const contactMessageRouterRestApi = require('../pl-REST-API/routers/contact-message-router')
const postRouterRestApi = require('../pl-REST-API/routers/post-router')


// Requiring managers
const accountManagerFun = require('../bll/account-manager')
const categoryManagerFun = require('../bll/category-manager')
const contactMessageManagerFun = require('../bll/contact-message-manager')
const locationManagerFun = require('../bll/location-manager')
const postManagerFun = require('../bll/post-manager')



// Requiring validators

const accountValidatorFun = require('../bll/account-validator')
const contactMessageValidatorFun = require('../bll/contact-message-validator')
const postValidatorFun = require('../bll/post-validator')

// Requiring session handler

const sessionHandlerFun = require('./session-handler')



// Registering the functions as dependencies in the container

container.register('variousRouter', awilix.asFunction(variousRouter))

container.register('accountRouter', awilix.asFunction(accountRouter))
container.register('accountManager', awilix.asFunction(accountManagerFun))
container.register('accountRepo', awilix.asFunction(accountRepoFun))
container.register('accountValidator', awilix.asFunction(accountValidatorFun))

container.register('categoryManager', awilix.asFunction(categoryManagerFun))
container.register('categoryRepo', awilix.asFunction(categoryRepoFun))

container.register('contactMessageManager', awilix.asFunction(contactMessageManagerFun))
container.register('contactMessageRepo', awilix.asFunction(contactMessageRepoFun))

container.register('locationManager', awilix.asFunction(locationManagerFun))
container.register('locationRepo', awilix.asFunction(locationRepoFun))

container.register('postRouter', awilix.asFunction(postRouter))
container.register('postManager', awilix.asFunction(postManagerFun))
container.register('postRepo', awilix.asFunction(postRepoFun))
container.register('postValidator', awilix.asFunction(postValidatorFun))

container.register('contactMessageRouter', awilix.asFunction(contactMessageRouter))
container.register('contactMessageValidator', awilix.asFunction(contactMessageValidatorFun))

container.register('sessionHandler', awilix.asFunction(sessionHandlerFun))

container.register('variousRouterRestApi', awilix.asFunction(variousRouterRestApi))
container.register('accountRouterRestApi', awilix.asFunction(accountRouterRestApi))
container.register('contactMessageRouterRestApi', awilix.asFunction(contactMessageRouterRestApi))
container.register('postRouterRestApi', awilix.asFunction(postRouterRestApi))


//////// Using routers ////////////////////////////////////////////////////////////////////////////////


const theAccountRouter = container.resolve('accountRouter')
const theVariousRouter = container.resolve('variousRouter')
const thePostRouter = container.resolve('postRouter')
const theContactMessageRouter = container.resolve('contactMessageRouter')

const theAccountRouterRestApi = container.resolve('accountRouterRestApi')
const theVariousRouterRestApi = container.resolve('variousRouterRestApi')
const thePostRouterRestApi = container.resolve('postRouterRestApi')
const theContactMessageRouterRestApi = container.resolve('contactMessageRouterRestApi')


//Using routers for web application

app.use("/account", theAccountRouter)
app.use("/", theVariousRouter)
app.use("/post", thePostRouter)
app.use("/contact-message", theContactMessageRouter)

// Using routers for REST API

app.use("/", theAccountRouterRestApi)
 
/*
app.use("/", theVariousRouterRestApi)
app.use("/post", thePostRouterRestApi)
app.use("/contact-message", theContactMessageRouterRestApi)
*/


//////// Listening for incoming HTTP requests! ////////////////////////////////////////////////////////////////////////////////
app.listen(8080, function () {
    console.log('Web application listening on port 8080')
})