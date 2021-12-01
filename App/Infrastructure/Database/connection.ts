import SequelizeConnection from "./sequelize/connection/sequelize.connection";

let orm = SequelizeConnection
let db = orm.connect()

export default db