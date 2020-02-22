
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

//////// Requiring router files ////////////////////////////////////////////////////////////////////////////////

const accountRouter = require('./routers/account-router')
const variousRouter = require('./routers/various-router')
const postRouter = require('./routers/post-router')
const contactMessageRouter = require('./routers/contact-message-router')


//////// Middlewares ////////////////////////////////////////////////////////////////////////////////


//const sessionHandler = require('./session-handler')

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


//////// AWILIX  ////////////////////////////////////////////////////////////////////////////////


// Requiring the functions in the manager and repository files (and other files)

const accountManagerFun = require('../bll/account-manager')
const accountRepoFun = require('../dal/account-repository')

const categoryManagerFun = require('../bll/category-manager')
const categoryRepoFun = require('../dal/category-repository')

const contactMessageManagerFun = require('../bll/contact-message-manager')
const contactMessageRepoFun = require('../dal/contact-message-repository')

const locationManagerFun = require('../bll/location-manager')
const locationRepoFun = require('../dal/location-repository')

const postManagerFun = require('../bll/post-manager')
const postRepoFun = require('../dal/post-repository')

const accountValidatorFun = require('../bll/account-validator')
const contactMessageValidatorFun = require('../bll/contact-message-validator')
const postValidatorFun = require('../bll/post-validator')

const sessionHandlerFun = require('./session-handler')



// Creating the container and registering the functions as dependencies 

const container = awilix.createContainer()

container.register('accountManager', awilix.asFunction(accountManagerFun))
container.register('accountRepo', awilix.asFunction(accountRepoFun))

container.register('categoryManager', awilix.asFunction(categoryManagerFun))
container.register('categoryRepo', awilix.asFunction(categoryRepoFun))

container.register('contactMessageManager', awilix.asFunction(contactMessageManagerFun))
container.register('contactMessageRepo', awilix.asFunction(contactMessageRepoFun))

container.register('locationManager', awilix.asFunction(locationManagerFun))
container.register('locationRepo', awilix.asFunction(locationRepoFun))

container.register('postManager', awilix.asFunction(postManagerFun))
container.register('postRepo', awilix.asFunction(postRepoFun))

container.register('accountValidator', awilix.asFunction(accountValidatorFun))
container.register('contactMessageValidator', awilix.asFunction(contactMessageValidatorFun))
container.register('postValidator', awilix.asFunction(postValidatorFun))

container.register('sessionHandler', awilix.asFunction(sessionHandlerFun))





// Resolving the dependencies... WHYYYYY THOUGH????

const accountManager = container.resolve('accountManager')
const accountRepo = container.resolve('accountRepo')

const categoryManager = container.resolve('categoryManager')
const categoryRepo = container.resolve('categoryRepo')

const contactMessageManager = container.resolve('contactMessageManager')
const contactMessageRepo = container.resolve('contactMessageRepo')

const locationManager = container.resolve('locationManager')
const locationRepo = container.resolve('locationRepo')

const postManager = container.resolve('postManager')
const postRepo = container.resolve('postRepo')

const accountValidator = container.resolve('accountValidator')
const contactMessageValidator = container.resolve('contactMessageValidator')
const postValidator = container.resolve('postValidator')

const sessionHandler = container.resolve('sessionHandler')


//////// Using routers ////////////////////////////////////////////////////////////////////////////////

app.use("/account", accountRouter)
app.use("/", variousRouter)
app.use("/post", postRouter)
app.use("/contact-message", contactMessageRouter)




//////// Listening for incoming HTTP requests! ////////////////////////////////////////////////////////////////////////////////

app.listen(8080, function () {
    console.log('Web application listening on port 8080')
})