import TodoEntity from '../../Domain/Todo/todo.entity';
import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import SequelizeTodoRepository from '../../Infrastructure/MySqlrepository/todo.repository';

class TodosService {
    public repository
    constructor(sequelizeTodoRepository: SequelizeTodoRepository){
        this.repository = sequelizeTodoRepository
    }
    public async getTodos(pagination:PaginationOptions){
        return this.repository.fetchAll(pagination)
    }
    public async createTodo(name:string) {
        const todoEntity = TodoEntity.createFromInput(name)
        return this.repository.addItem(todoEntity)
    }
    public async updateTodo(id:string, body:any){
        const todoEntity:TodoEntity = await this.getTodo(id);
        todoEntity.name = body.name
        return this.repository.editItem(todoEntity)
    }
    public async deleteTodo(id:string){
        const todoEntity:TodoEntity = await this.getTodo(id);
        return this.repository.removeItem(todoEntity)
    }
    public async getTodo(id:string){
        return this.repository.fetchById(id)
    }
}
export default TodosService
