import UserEntity from '../../Domain/User/user.entity';
import UserRepositoryI from '../../Domain/User/user.repository';
import UserModel from '../Database/sequelize/models/user';
import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import PaginatedCollection from '../../Domain/Utils/Pagination/pagination.collection';
import { injectable } from 'inversify';

@injectable()
class SequelizeUserRepository implements UserRepositoryI {
  public async fetchAll(
    pagination: PaginationOptions
  ): Promise<PaginatedCollection<UserEntity>> {
    const users = await (UserModel as any).findAndCountAll({
      limit: pagination.limit(),
      offset: pagination.offset(),
    });

    const usersCollection = users.rows.map((user: any) => {
      return UserEntity.createFromDb(user);
    });

    const paginatedCollection = new PaginatedCollection<UserEntity>(
      pagination,
      users.count,
      usersCollection
    );

    return paginatedCollection;
  }

  public async fetchById(id: string) {
    try {
      const user = await (UserModel as any).findOne({ where: { id } });

      if (!user) {
        return false;
      }

      return UserEntity.createFromDb(user);
    } catch (err) {
      throw err;
    }
  }

  public async fetchByEmail(email: string) {
    try {
      const user = await (UserModel as any).findOne({ where: { email } });

      if (!user) {
        throw new Error('Resource not found');
      }

      return UserEntity.createFromDb(user);
    } catch (err) {
      throw err;
    }
  }

  public async addUser(userEntity: UserEntity) {
    try {
      await UserModel.create(userEntity);
      return;
    } catch (err) {
      throw err;
    }
  }

  public async editUser(userEntity: UserEntity) {
    try {
      await (UserModel as any).update(userEntity, {
        where: { id: userEntity.id },
      });
      return;
    } catch (err) {
      throw err;
    }
  }

  public async removeUser(userEntity: UserEntity) {
    try {
      await (UserModel as any).destroy({
        where: { id: userEntity.id },
      });
      return;
    } catch (err) {
      throw err;
    }
  }
}

export default SequelizeUserRepository;
