import UserEntity from './user.entity';
import PaginatedCollection from '../Utils/Pagination/pagination.collection';
import PaginationOptions from '../Utils/Pagination/pagination.options';

interface UserRepositoryI {
  fetchAll(
    pagination: PaginationOptions
  ): Promise<PaginatedCollection<UserEntity>>;
  fetchById(id: string): Promise<UserEntity | false>;
  fetchByEmail(email: string): Promise<UserEntity>;
  addUser(userEntity: UserEntity): Promise<void>;
  editUser(userEntity: UserEntity): Promise<void>;
  removeUser(userEntity: UserEntity): Promise<void>;
}
export default UserRepositoryI;
