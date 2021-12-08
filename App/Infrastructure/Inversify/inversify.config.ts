import { Container } from 'inversify';
import AuthService from '../../Application/Services/auth.service';
import TodosService from '../../Application/Services/todos.service';
import UsersService from '../../Application/Services/users.service';
import TodoRepositoryI from '../../Domain/Todo/todo.repository';
import UserRepositoryI from '../../Domain/User/user.repository';
import SequelizeTodoRepository from '../MySqlrepository/todo.repository';
import SequelizeUserRepository from '../MySqlrepository/user.repository';
import AuthTokenService from '../Services/auth.service';
import TYPES from './types';

const myContainer = new Container();

myContainer
  .bind<TodoRepositoryI>(TYPES.TodoRepositoryI)
  .to(SequelizeTodoRepository);
myContainer
  .bind<UserRepositoryI>(TYPES.UserRepositoryI)
  .to(SequelizeUserRepository);
myContainer.bind<AuthTokenService>(TYPES.AuthTokenService).to(AuthTokenService);
myContainer.bind<AuthService>(TYPES.AuthService).to(AuthService);
myContainer.bind<UsersService>(TYPES.UsersService).to(UsersService);
myContainer.bind<TodosService>(TYPES.TodosService).to(TodosService);

export default myContainer;
