
<<<<<<< HEAD
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://friendy:5555@postgres:5432/webAppPostgreSQLDb') 


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

=======
const sequelize = new Sequelize('postgres://friendy:5555@postgres:5432/webAppPostgreSQLDb') 
>>>>>>> part7_branch_Dennis

module.exports = sequelize