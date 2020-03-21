const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://friendy:5555@postgres:5432/webAppPostgreSQLDb')

const db = require('./db')

const tryToAuth = function (sequelize) {
    sequelize
        .authenticate()
        .then(() => {
            db(sequelize, Sequelize)
                .then(function () {
                    console.log("Connection with PostgreSQL database successfully established.")
                    clearInterval(interval)
                })
            })

        .catch(error => {
            console.error("Unable to connect to PostgreSQL database:", error)
        })
}

var interval = setInterval(tryToAuth, 1000, sequelize)

module.exports = sequelize