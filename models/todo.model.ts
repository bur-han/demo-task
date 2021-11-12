import mongoose from 'mongoose'
import Sequelize from 'sequelize';
import {db} from '../helpers/database'
import { v4 as uuidv4 } from 'uuid';

var TodoModel:any
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
  })
  TodoModel = mongoose.model('Todos', todoSchema)
}
if(process.env.ORM === 'Sequelize')
{
  TodoModel = db.define('todos', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
}
export default TodoModel



   


