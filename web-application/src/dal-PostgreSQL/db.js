
const sequelize = new Sequelize('postgres://webAppPostDb:5555@postgres:5432/dbname') 

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


module.exports = sequelize