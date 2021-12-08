import TodoRepositoryI from '../../Domain/Todo/todo.repository';
import TodoEntity from '../../Domain/Todo/todo.entity';
import PaginatedCollection from '../../Domain/Utils/Pagination/pagination.collection';
import TodoModel from '../Database/sequelize/models/todo';
import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import { injectable } from 'inversify';

@injectable()
class SequelizeTodoRepository implements TodoRepositoryI {
  public async fetchAll(
    userId: string,
    pagination: PaginationOptions
  ): Promise<PaginatedCollection<TodoEntity>> {
    const todos = await (TodoModel as any).findAndCountAll({
      limit: pagination.limit(),
      offset: pagination.offset(),
      where: { userId },
    });

    const todosCollection = todos.rows.map((user: any) => {
      return TodoEntity.createFromDb(user);
    });

    const paginatedCollection = new PaginatedCollection<TodoEntity>(
      pagination,
      todos.count,
      todosCollection
    );

    return paginatedCollection;
  }

  public async fetchById(id: string) {
    try {
      const user = await (TodoModel as any).findOne({ where: { id } });

      if (!user) {
        return false;
      }

      return TodoEntity.createFromDb(user);
    } catch (err) {
      throw err;
    }
  }

  public async addItem(todoEntity: TodoEntity) {
    try {
      await TodoModel.create(todoEntity);
      return;
    } catch (err) {
      throw err;
    }
  }

  public async editItem(todoEntity: TodoEntity) {
    try {
      await (TodoModel as any).update({
        where: { id: todoEntity.id },
      });
      return;
    } catch (err) {
      throw err;
    }
  }

  public async removeItem(todoEntity: TodoEntity) {
    try {
      await (TodoModel as any).destroy({
        where: { id: todoEntity.id },
      });
      return;
    } catch (err) {
      throw err;
    }
  }
}

export default SequelizeTodoRepository;
