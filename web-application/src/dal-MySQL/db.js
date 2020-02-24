const mysql = require('mysql')

const db = mysql.createConnection({
    host: "db", 
    user: "root", 
    password: "abc5555", 
    database: "webAppDb"
})

module.exports = db