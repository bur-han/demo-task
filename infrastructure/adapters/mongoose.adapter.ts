import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
let db:any

class MongooseAdapter {
    public static connect(){
        mongoose.connect(process.env.DATABASE_URL as any)
        db = mongoose.connection
        db.on('error', (error: any) => console.error(error))
        db.once('open', () => console.log('Connected to database'))
        return db
    }
    public static getTodoSchema(){
        const todoSchema = new mongoose.Schema({
            _id: { type: String, default: function genUUID() {
              return uuidv4()
          }},
            name: {
              type: String,
              required: true
            },
          })
          return mongoose.model('Todos', todoSchema)
    }
    public static getUserSchema(){
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
          return mongoose.model('Users', userSchema)
    }
}
export default MongooseAdapter