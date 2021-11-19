import { Sequelize } from 'sequelize';
let db:any
class SequelizeConnection {
    public static connect(){
        try{
            db = new Sequelize('todos', 'postgres', 'electric tomato', {
              host: 'localhost',
              dialect: 'postgres'
            });
          db.authenticate()
          console.log('Database connected')
          }
          catch(err){
            console.log('Error: ' + err)
          }
          db.Sequelize = Sequelize
          return db
    }
}
export default SequelizeConnection