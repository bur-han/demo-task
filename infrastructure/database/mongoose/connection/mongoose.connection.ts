import mongoose from 'mongoose';
import config from '../../../config/db'
let db:any
class MongooseConnection {
    public static connect(){
        mongoose.connect(config.dbUrl as string)
        db = mongoose.connection
        db.on('error', (error: any) => console.error(error))
        db.once('open', () => console.log('Connected to database'))
        return db
    }
}
export default MongooseConnection