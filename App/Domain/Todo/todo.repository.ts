import TodoEntity from '../Todo/todo.entity';
import PaginatedCollection from '../Utils/Pagination/pagination.collection';
import PaginationOptions from '../Utils/Pagination/pagination.options';
interface TodoRepositoryI {
  fetchAll(
    userId: string,
    pagination: PaginationOptions
  ): Promise<PaginatedCollection<TodoEntity>>;
  fetchById(id: string): Promise<TodoEntity | false>;
  addItem(todoEntity: TodoEntity): Promise<void>;
  editItem(todoEntity: TodoEntity): Promise<void>;
  removeItem(todoEntity: TodoEntity): Promise<void>;
}
export default TodoRepositoryI;
