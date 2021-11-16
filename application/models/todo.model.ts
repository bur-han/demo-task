import MongooseAdapter from "../../infrastructure/adapters/mongoose.adapter"
import SequelizeAdapter from "../../infrastructure/adapters/sequelize.adapter"

var adapter = process.env.ORM === 'Mongoose' ? MongooseAdapter: SequelizeAdapter
var TodoModel = adapter.getTodoSchema()
export default TodoModel



   


