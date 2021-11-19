import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const todoSchema = new mongoose.Schema({
    _id: { type: String, default: function genUUID() {
      return uuidv4()
  }},
    name: {
      type: String,
      required: true
    },
  })
  var TodoModel = mongoose.model('Todos', todoSchema)
  export default TodoModel