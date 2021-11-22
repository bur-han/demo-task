import { Sequelize } from 'sequelize';
import db from '../../connection'
let UserModel = db.define('users', {
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
  export default UserModel