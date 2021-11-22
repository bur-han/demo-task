import { Sequelize } from 'sequelize';
import db from '../../connection'
let TodoModel = db.define('todos', {
    id: {
      type: (Sequelize as any).UUID,
      defaultValue: (Sequelize as any).UUIDV1,
      primaryKey: true
    },
    name: {
      type: (Sequelize as any).STRING
    }
  });
  export default TodoModel