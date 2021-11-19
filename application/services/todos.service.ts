import config from '../../config';
import MongooseTodoRepository from '../../infrastructure/database/mongoose/repository/mongoose.todo.repository';
import SequelizeTodoRepository from '../../infrastructure/database/sequelize/repository/sequelize.todo.repository';
var orm = config.orm === 'Mongoose' ? new MongooseTodoRepository(): new SequelizeTodoRepository()

class TodosService {
    public async getTodos(){
        var response =orm.fetchAll()
        return response
    }

    public async createTodo(name:any) {
        var response = orm.create(name)
        return response
}

    public async updateTodo(id:any, body:any){
        var response = orm.update(id,body)
        return response
    }

    public async deleteTodo(id:any){
        var response = orm.delete(id)
        return response
    }
    
    public async getTodo(id:any){
        var response = orm.fetchById(id)
        return response
    }
}
export default TodosService
