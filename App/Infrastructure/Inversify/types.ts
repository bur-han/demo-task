import 'reflect-metadata';

const TYPES = {
  TodoRepositoryI: Symbol.for('TodoRepositoryI'),
  UserRepositoryI: Symbol.for('UserRepositoryI'),
  AuthTokenService: Symbol.for('AuthTokenService'),
  AuthService: Symbol.for('AuthService'),
  TodosService: Symbol.for('TodosService'),
  UsersService: Symbol.for('UsersService'),
};
export default TYPES;
