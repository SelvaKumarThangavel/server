const Sequelize = require('sequelize')
const sequelize = new Sequelize('angularapplication', 'db', 'Kgisl@123', {
host: 'GSS468',
dialect: 'mysql',
operatorsAliases: false,
 
pool: {
max: 5,
min: 0,
acquire: 30000,
idle: 10000
 }
})

module.exports = sequelize