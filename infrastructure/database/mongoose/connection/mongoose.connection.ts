import mongoose from 'mongoose';
import config from '../../../config/db'
import logger from '../../../services/logger.service';
let db:any
class MongooseConnection {
    public static connect(){
        mongoose.connect(config.dbUrl as string)
        db = mongoose.connection
        db.on('error', (error: any) => logger.error(error))
        db.once('open', () => logger.info('Connected to database'))
        return db
    }
}
export default MongooseConnection