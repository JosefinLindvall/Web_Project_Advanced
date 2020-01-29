const mysql = require("mysql")

const db = mysql.createConnection({
    host: "db", 
    user: "root", 
    password: "abc123", 
    database: "myDB"
})