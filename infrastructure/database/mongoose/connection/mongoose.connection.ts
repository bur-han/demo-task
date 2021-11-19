import mongoose from 'mongoose';
import config from '../../../../config'
let db:any
class MongooseConnection {
    public static connect(){
        console.log('here')
        mongoose.connect(config.dbUrl as any)
        db = mongoose.connection
        db.on('error', (error: any) => console.error(error))
        db.once('open', () => console.log('Connected to database'))
        return db
    }
}
export default MongooseConnection