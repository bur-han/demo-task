import UserEntity from '../../Domain/User/user.entity';
import UserRepositoryI from '../../Domain/User/user.repository';
import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import CustomError from '../../Infrastructure/Exceptions/custom-error';
import { hashIt } from '../../Infrastructure/Services/bcrypt.service';
import { injectable, inject } from 'inversify';
import TYPES from '../../Infrastructure/Inversify/types';

@injectable()
class UsersService {
  public repository;

  constructor(@inject(TYPES.UserRepositoryI) userRepository: UserRepositoryI) {
    this.repository = userRepository;
  }

  public async getUsers(pagination: PaginationOptions) {
    const result = await this.repository.fetchAll(pagination);

    return result.getPaginatedData();
  }

  public async createUser(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new CustomError(400, 'Must provide both email and password');
      }

      const hash = await hashIt(password);
      const userEntity = UserEntity.createFromInput(email, hash);
      await this.repository.addUser(userEntity);
      return;
    } catch (err) {
      throw err;
    }
  }

  public async updateUser(id: string, body: any) {
    const userEntity = await this.repository.fetchById(id);

    if (!userEntity) {
      throw new CustomError(400, 'Resource not found');
    }

    userEntity.email = body.email;
    userEntity.password = body.password;

    return this.repository.editUser(userEntity);
  }

  public async deleteUser(id: string) {
    const userEntity = await this.repository.fetchById(id);

    if (!userEntity) {
      throw new CustomError(400, 'Resource not found');
    }

    return this.repository.removeUser(userEntity);
  }

  public async getUser(id: string) {
    const userEntity = await this.repository.fetchById(id);

    if (!userEntity) {
      throw new CustomError(400, 'Resource not found');
    }

    return userEntity;
  }
}

export default UsersService;
