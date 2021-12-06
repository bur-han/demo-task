import SequelizeConnection from "./sequelize/connection/sequelize.connection";

const orm = SequelizeConnection
const db = orm.connect()

export default db