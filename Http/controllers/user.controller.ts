import UsersService from '../../App/Application/Services/users.service';
import PaginationOptions from '../../App/Domain/Utils/Pagination/pagination.options';
import SequelizeUserRepository from '../../App/Infrastructure/MySqlrepository/user.repository';
import handleError from '../Util/error.handler';
const userService = new UsersService(new SequelizeUserRepository());

class UserController {
  public async getUsers(req: any, res: any) {
    try {
      const pagination = new PaginationOptions(
        req.query.page,
        req.query.perpage
      );

      const response = await userService.getUsers(pagination);

      return res.status(200).json({ todos: response as any });
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  public async getUser(req: any, res: any) {
    try {
      const response = await userService.getUser(req.params.id);

      return res.status(200).json({ user: response as any });
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  public async createUser(req: any, res: any) {
    try {
      await userService.createUser(req.body.email, req.body.password);
      return res.status(201).json({ message: 'Successfully created' });
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  public async updateUser(req: any, res: any) {
    try {
      await userService.updateUser(req.params.id, req.body);

      return res.status(200).json('Successfully updated');
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  public async deleteUser(req: any, res: any) {
    try {
      await userService.deleteUser(req.params.id);

      return res.status(200).json('Successfully deleted');
    } catch (err: any) {
      return handleError(err, res);
    }
  }
}
export default UserController;
