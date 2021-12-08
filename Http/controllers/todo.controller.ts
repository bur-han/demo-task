import TodosService from '../../App/Application/Services/todos.service';
import PaginationOptions from '../../App/Domain/Utils/Pagination/pagination.options';
import myContainer from '../../App/Infrastructure/Inversify/inversify.config';
import TYPES from '../../App/Infrastructure/Inversify/types';
import handleError from '../Util/error.handler';
const todosService = myContainer.get<TodosService>(TYPES.TodosService);

class TodoController {
  static async getTodos(req: any, res: any) {
    try {
      const pagination = new PaginationOptions(
        req.query.page,
        req.query.perpage
      );

      const response = await todosService.getTodos(
        req.session.userId,
        pagination
      );

      res.status(200).json({ todos: response as any });
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  static async createTodo(req: any, res: any) {
    try {
      const response = await todosService.createTodo(
        req.session.userId,
        req.body.name
      );

      return res.status(201).json({ todo: response as any });
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  static async getTodo(req: any, res: any) {
    try {
      const response = await todosService.getTodo(req.params.id);

      return res.status(200).json({ todo: response as any });
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  static async updateTodo(req: any, res: any) {
    try {
      await todosService.updateTodo(req.params.id, req.body.name);

      return res.status(200).json('Successfully updated');
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  static async deleteTodo(req: any, res: any) {
    try {
      await todosService.deleteTodo(req.params.id);

      return res.status(200).json('Successfully deleted');
    } catch (err: any) {
      return handleError(err, res);
    }
  }
}
export default TodoController;
