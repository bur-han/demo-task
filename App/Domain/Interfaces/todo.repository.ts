import TodoEntity from '../Todo/todo.entity'
import PaginationOptions from '../Utils/Pagination/pagination.options'
interface TodoRepositoryI {
    fetchAll(pagination:PaginationOptions):Promise<{totalItems: number; totalPages: number; currentPage: number; perPage: number; data: TodoEntity[]}>; //mention return types, naming convention
    fetchById(id: string):Promise<TodoEntity>;
    addItem(name:string):Promise<TodoEntity>
    editItem(id:string, body:any):Promise<Boolean>
    removeItem(id:string):Promise<Boolean>
}
export default TodoRepositoryI