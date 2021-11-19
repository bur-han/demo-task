import MongooseConnection from "../database/mongoose/connection/mongoose.connection";
import SequelizeConnection from "../database/sequelize/connection/sequelize.connection";
import config from '../../config'

var orm = config.orm === 'Mongoose' ? MongooseConnection: SequelizeConnection
var db = orm.connect()

export default db