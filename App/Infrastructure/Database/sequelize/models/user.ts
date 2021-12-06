import { Sequelize } from 'sequelize';
import db from '../../connection'
const UserModel = db.define('users', {
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
    },
    createdAt: {
      type: (Sequelize as any).DATE,
        defaultValue: Sequelize.fn('NOW'),
      allowNull: false
    },
    updatedAt: {
      type: (Sequelize as any).DATE,
      defaultValue: Sequelize.fn('NOW'),
        allowNull: false
    }
   
  });
  export default UserModel