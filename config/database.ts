const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
let db
if(process.env.ORM === 'Sequelize')
{
    db = new Sequelize('todos', 'postgres', 'electric tomato', {
        host: 'localhost',
        dialect: 'postgres'
      });
}
if(process.env.ORM === 'Mongoose')
{
mongoose.connect(process.env.DATABASE_URL)
db = mongoose.connection
}
module.exports = db