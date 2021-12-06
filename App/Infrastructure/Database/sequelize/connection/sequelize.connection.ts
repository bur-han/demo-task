import { Sequelize } from 'sequelize';
import logger from '../../../Helpers/logger';
let db:any
class SequelizeConnection {
    public static connect(){
        try{
            db = new Sequelize('todos', 'postgres', 'electric tomato', {
              host: 'localhost',
              dialect: 'postgres'
            });
          db.authenticate()
          logger.info('Database connected')
          }
          catch(err){
            logger.error('Error: ' + err)
          }
          db.Sequelize = Sequelize
          return db
    }
}
export default SequelizeConnection