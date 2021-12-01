import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import SequelizeTodoRepository from '../../Infrastructure/MySqlrepository/sequelize/todo.repository';
let repository = new SequelizeTodoRepository()

class TodosService {
    public async getTodos(pagination:PaginationOptions){
        let response =repository.fetchAll(pagination)
        return response
    }

    public async createTodo(name:string) {
        let response = repository.addItem(name)
        return response
}

    public async updateTodo(id:string, body:any){
        let response = repository.editItem(id,body)
        return response
    }

    public async deleteTodo(id:string){
        let response = repository.removeItem(id)
        return response
    }
    
    public async getTodo(id:string){
        let response = repository.fetchById(id)
        return response
    }
}
export default TodosService
