import { Sequelize } from 'sequelize';
import db from '../../connection';
import UserModel from './user';
const TodoModel = db.define(
  'todos',
  {
    id: {
      type: (Sequelize as any).UUID,
      defaultValue: (Sequelize as any).UUIDV1,
      primaryKey: true,
    },
    name: {
      type: (Sequelize as any).STRING,
    },
  },
  { timestamps: true }
);

TodoModel.belongsTo(UserModel);

export default TodoModel;
