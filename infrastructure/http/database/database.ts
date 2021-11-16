import MongooseAdapter from "../../adapters/mongoose.adapter"
import SequelizeAdapter from "../../adapters/sequelize.adapter"

var adapter = process.env.ORM === 'Mongoose' ? MongooseAdapter: SequelizeAdapter
var db = adapter.connect()

export default db