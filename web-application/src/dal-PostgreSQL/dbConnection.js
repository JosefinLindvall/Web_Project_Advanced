// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('postgres://friendy:5555@postgres:5432/webAppPostgreSQLDb')

// const db = require('./db')

// const tryToAuth = function (sequelize) {
//     sequelize
//     .authenticate()
//     .then(() => {
//         db(sequelize, Sequelize).then(function (tables) {
//             console.log("Connection has been established successfully")
//             clearInterval(interval)
//         })
//     })

//     .catch(error => {
//         console.error("unable to connect to the database:", error)
//     })
// }

// var interval = setInterval(tryToAuth, 1000, sequelize)

// module.exports = sequelize