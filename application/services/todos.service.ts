import config from '../../infrastructure/config/db';
import MongooseTodoRepository from '../../infrastructure/database/mongoose/repository/todo.repository';
import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import SequelizeTodoRepository from '../../infrastructure/database/sequelize/repository/todo.repository';
let orm = config.orm === 'Mongoose' ? new MongooseTodoRepository(): new SequelizeTodoRepository()

class TodosService {
    public async getTodos(pagination:PaginationOptions){
        let response =orm.fetchAll(pagination)
        return response
    }

    public async createTodo(name:string) {
        let response = orm.create(name)
        return response
}

    public async updateTodo(id:string, body:any){
        let response = orm.update(id,body)
        return response
    }

    public async deleteTodo(id:string){
        let response = orm.delete(id)
        return response
    }
    
    public async getTodo(id:string){
        let response = orm.fetchById(id)
        return response
    }
}
export default TodosService
