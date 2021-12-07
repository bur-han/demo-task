import SequelizeConnection from './sequelize/connection/sequelize.connection';

const db = SequelizeConnection.connect();

export default db;
