

module.exports = function(sequelize, Sequelize) {


    //Creating tables
    
    const Account = sequelize.define('account', {
        firstName: {type: Sequelize.TEXT, allowNull:false}, 
        lastName: {type: Sequelize.TEXT, allowNull:false},
        email: {type: Sequelize.TEXT, allowNull:false, unique: true},
        phoneNumber: {type: Sequelize.TEXT, allowNull:false},
        password: {type: Sequelize.TEXT, allowNull:false},
        birthDate: {type: Sequelize.DATE, allowNull:false},
        gender: {type: Sequelize.TEXT, allowNull:false},
        typeOfUser: {type: Sequelize.TEXT, allowNull:false}
    })

    sequelize.define('contactMessage', {
        title: {type: Sequelize.TEXT, allowNull:false},
        content: {type: Sequelize.TEXT, allowNull:false},
        email: {type: Sequelize.TEXT, allowNull:false}
    })

    const Category = sequelize.define('category', {
        categoryID: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
            type: Sequelize.INTEGER
        }, 
        category: {
            type: Sequelize.TEXT, 
            allowNull:false,
            unique: true
        },
    })

    const Location = sequelize.define('location', {
        locationID: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
            type: Sequelize.INTEGER
        },
        location: {
            type: Sequelize.TEXT, 
            allowNull:false,
            unique: true
        },
    })

    const Post = sequelize.define('post', {
        postID: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.TEXT, 
            allowNull:false
        },
        content: {
            type: Sequelize.TEXT, 
            allowNull:false
        },
    }) 

    Account.hasMany(Post,{ 
        foreignKey: "accountID"
    })  
        
    Category.hasMany(Post,{
        foreignKey: "categoryID"
    })  

    Location.hasMany(Post,{
        foreignKey: "locationID"
    }) 

    return sequelize.sync()
    .then(function() { 
        
        return Account.findByPk(1)
        
        .then(function(account) {
            
            if (account) {
                return
            }

            else {
                Account.create({
                    firstName: "Dennis",
                    lastName: "Andersson",
                    password: "$2b$10$LcOebxeCpIRiFLuZuVfNI.bY4qr88w1Lc4NqtLBtK8czjZP1EVK8e",
                    email: "dennisfram@hotmail.com",
                    phoneNumber: "0730896460",
                    birthDate: "1996-04-28",
                    gender: "male",
                    typeOfUser: "Admin"
                })            
            }
        }) 
    })


    .then(function() { 
        return Account.findByPk(2).then(function(account) {
            if (account) {
                return
            }

            else {
                Account.create({
                    firstName: "Josefin",
                    lastName: "Lindvall",
                    password: "$2b$10$LcOebxeCpIRiFLuZuVfNI.bY4qr88w1Lc4NqtLBtK8czjZP1EVK8e",
                    email: "j@j",
                    phoneNumber: "0703721510",
                    birthDate: "1997-12-26",
                    gender: "female",
                    typeOfUser: "Admin"
                })            
            }
        }) 
    })

    .then (function() {

        //Putting in hard coded data for categories
        /*Category.create({
            category: "Hiking",
        })

        Category.create({
            category: "Cinema",
        })

        Category.create({
            category: "Dancing",
        })

        //Putting in hard coded data for locations
        Location.create({
            location: "Aneby",
        })

        Location.create({
            location: "Stockholm",
        })

        Location.create({
            location: "Lund",
        })*/
        console.log("just before returning from db function")

    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
