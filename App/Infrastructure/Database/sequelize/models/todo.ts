import { Sequelize } from 'sequelize';
import db from '../../connection'
const TodoModel = db.define('todos', {
    id: {
      type: (Sequelize as any).UUID,
      defaultValue: (Sequelize as any).UUIDV1,
      primaryKey: true
    },
    name: {
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
  export default TodoModel