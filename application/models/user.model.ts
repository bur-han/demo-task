import MongooseAdapter from "../../infrastructure/adapters/mongoose.adapter"
import SequelizeAdapter from "../../infrastructure/adapters/sequelize.adapter"

var adapter = process.env.ORM === 'Mongoose' ? MongooseAdapter: SequelizeAdapter
var UserModel = adapter.getUserSchema()
export default UserModel
