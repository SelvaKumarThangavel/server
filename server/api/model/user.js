const Sequelize = require('sequelize')
const sequelize = require('../db/db.js')

module.exports = sequelize.define(
    'user',
     {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
             },
        username: {
            type: Sequelize.STRING,
             },
        email:{
            type: Sequelize.STRING,
             },
        password:{
            type: Sequelize.STRING,
        },
        created_at:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_at:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
     },
     {
        timestamps: false
     }
)