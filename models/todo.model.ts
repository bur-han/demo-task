import mongoose from 'mongoose'
const Sequelize = require('sequelize');
const db = require('../config/database');
import { v4 as uuidv4 } from 'uuid';

if(process.env.ORM === 'Mongoose')
{
  const todoSchema = new mongoose.Schema({
    _id: { type: String, default: function genUUID() {
      return uuidv4()
  }},
    name: {
      type: String,
      required: true
    },
    // createdAt: {
    //   type: Date,
    //   required: true,
    //   default: Date.now
    // }
  })
  
  module.exports = mongoose.model('Todos', todoSchema)
}

if(process.env.ORM === 'Sequelize')
{
  const Todo = db.define('todos', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  
  // Todo.sync().then(() => {
  //   console.log('table created');
  // });
  module.exports = Todo;
}



   


