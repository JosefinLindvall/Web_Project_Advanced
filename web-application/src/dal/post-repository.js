const mysql = require("mysql")

const db = mysql.createConnection({
    host: "db", 
    user: "root", 
    password: "abc123", 
    database: "myDB"
})

exports.getSpecificNrOfPosts = function( nrOfPosts, callback) {

    // db.query("SELECT * FROM posts 
    // WHERE timestamp = (SELECT MAX(timestamp) FROM sensorTable s2 WHERE s1.sensorID = s2.sensorID)
    // ORDER BY sensorID, timestamp;")
}

getPostsWithSpecificCategory