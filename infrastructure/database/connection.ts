import MongooseConnection from "./mongoose/connection/mongoose.connection";
import SequelizeConnection from "./sequelize/connection/sequelize.connection";
import config from '../config/db'

let orm = config.orm === 'Mongoose' ? MongooseConnection: SequelizeConnection
let db = orm.connect()

export default db