const {Sequelize} =require('sequelize');
const path =require('path');
const sequelize=new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', '..', 'test.db'),
    logging: false,
}) 

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  }); 

  module.exports = sequelize; 