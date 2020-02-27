const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://friendy:5555@postgres:5432/webAppPostgreSQLDb') 

module.exports = function({}){
  
    return {

    
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        createAllTables : function () {

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

            // do we need this const
            const ContactMessage = sequelize.define('contactMessage', {
                title: {type: Sequelize.TEXT, allowNull:false},
                content: {type: Sequelize.TEXT, allowNull:false},
                email: {type: Sequelize.TEXT, allowNull:false},
                timeWhenSent: {type: Sequelize.TIME, allowNull:false},
            })

            const Category = sequelize.define('category', {
                category: {type: Sequelize.TEXT, allowNull:false},
            })

            const Location = sequelize.define('location', {
                location: {type: Sequelize.TEXT, allowNull:false},
            })

            const Post = sequelize.define('post', {
                title: {type: Sequelize.TEXT, allowNull:false},
                content: {type: Sequelize.TEXT, allowNull:false},
                categoryID: {type: Sequelize.TEXT, allowNull:false},
                locationID: {type: Sequelize.TEXT, allowNull:false},
                accountID: {type: Sequelize.TEXT, allowNull:false}

            }) 

    

            Account.hasMany(Post)  // ett account har många post 
            Category.hasMany(Post)  //idk
            Location.hasMany(Post) 

            sequelize.sync()

            // Putting in hard coded data for admin users

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

            //Putting in hard coded data for categories

            Category.create({
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
            })
        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
        getAccountTable : function () {
            return sequelize.model("account")
        },

        getPostTable : function () { 
            return sequelize.model("post")
        },

        getContactMessageTable : function () { 
            return sequelize.model("contactMessage")
        },

        getCategoryTable : function () { 
            return sequelize.model("category")
        },

        getLocationTable : function () { 
            return sequelize.model("location")
        },
    }
}





