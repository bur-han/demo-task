import { Sequelize } from 'sequelize';
import database from '../http/database/database'
let db:any

class SequelizeAdapter {
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
          return db
    }
    public static getTodoSchema():any{
        var TodoModel = database.define('todos', {
            id: {
              type: (Sequelize as any).UUID,
              defaultValue: (Sequelize as any).UUIDV1,
              primaryKey: true
            },
            name: {
              type: (Sequelize as any).STRING
            }
          });
          return TodoModel
    }
    public static getUserSchema():any{
        var UserModel = database.define('users', {
            id: {
              type: (Sequelize as any).UUID,
              defaultValue: (Sequelize as any).UUIDV1,
              primaryKey: true
            },
            email: {
              type: (Sequelize as any).STRING
            },
            password: {
                type: (Sequelize as any).STRING
              }
          });
          return UserModel
    }
}
export default SequelizeAdapter