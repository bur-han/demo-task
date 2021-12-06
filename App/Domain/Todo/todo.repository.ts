import TodoEntity from '../Todo/todo.entity'
import PaginatedCollection from '../Utils/Pagination/pagination.collection'
import PaginationOptions from '../Utils/Pagination/pagination.options'
interface TodoRepositoryI {
    fetchAll(pagination:PaginationOptions):Promise<PaginatedCollection>
    fetchById(id: string):Promise<TodoEntity>
    addItem(todoEntity:TodoEntity):void
    editItem(todoEntity: TodoEntity):void
    removeItem(todoEntity: TodoEntity):void
}
export default TodoRepositoryI