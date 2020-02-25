const Sequelize = require('sequelize')

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
    categoryName: {type: Sequelize.TEXT, allowNull:false},
})

const Location = sequelize.define('location', {
    locationName: {type: Sequelize.TEXT, allowNull:false},
})

const Post = sequelize.define('post', {
    title: {type: Sequelize.TEXT, allowNull:false},
    content: {type: Sequelize.TIME, allowNull:false},
}) 

Account.hasMany(Post)  // ett account har många post 
Category.hasMany(Post)  //idk
Location.hasMany(Post) 




