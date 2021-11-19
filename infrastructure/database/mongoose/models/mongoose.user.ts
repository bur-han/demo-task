import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const userSchema = new mongoose.Schema({
    _id: { type: String, default: function genUUID() {
      return uuidv4()
  }},
    email: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
      }
  })
  var UserModel = mongoose.model('Users', userSchema)
  export default UserModel