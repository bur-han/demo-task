import TodoEntity from '../../Domain/Todo/todo.entity';
import TodoRepositoryI from '../../Domain/Todo/todo.repository';
import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import CustomError from '../../Infrastructure/Exceptions/custom-error';

class TodosService {
  public repository;

  constructor(todoRepository: TodoRepositoryI) {
    this.repository = todoRepository;
  }

  public async getTodos(userId: string, pagination: PaginationOptions) {
    const result = await this.repository.fetchAll(userId, pagination);

    return result.getPaginatedData();
  }

  public async createTodo(userId: string, name: string) {
    if (!name) {
      throw new CustomError(400, 'Must provide a name');
    }

    const todoEntity = TodoEntity.createFromInput(userId, name);

    await this.repository.addItem(todoEntity);
    return;
  }

  public async updateTodo(id: string, name: string) {
    const todoEntity = await this.repository.fetchById(id);

    if (!todoEntity) {
      throw new CustomError(400, 'Resource not found');
    }

    todoEntity.name = name;

    return this.repository.editItem(todoEntity);
  }

  public async deleteTodo(id: string) {
    const todoEntity = await this.repository.fetchById(id);

    if (!todoEntity) {
      throw new CustomError(400, 'Resource not found');
    }

    return this.repository.removeItem(todoEntity);
  }

  public async getTodo(id: string) {
    const todoEntity = await this.repository.fetchById(id);

    if (!todoEntity) {
      throw new CustomError(400, 'Resource not found');
    }

    return todoEntity;
  }
}

export default TodosService;
