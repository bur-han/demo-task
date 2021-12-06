import UserEntity from '../../Domain/User/user.entity';
import UserRepositoryI from '../../Domain/User/user.repository'
import UserModel from '../Database/sequelize/models/user'
import CustomError from '../Helpers/error';
import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import PaginatedCollection from '../../Domain/Utils/Pagination/pagination.collection';

class SequelizeUserRepository implements UserRepositoryI{
  public async fetchAll(pagination: PaginationOptions) {
    const users = await (UserModel as any).findAndCountAll({limit: pagination.limit(), offset:pagination.offset()},{raw:true})
    if(users)
    {
        const usersCollection = users.rows.map((user:any) => {
        return UserEntity.createFromDb(user)
        })
        const paginatedCollection = new PaginatedCollection(pagination, users.count, usersCollection);
        return paginatedCollection.getPaginatedData();
    }
    else
    throw new CustomError(500, 'Internal server error')
}
  public async fetchById(id:string){
    const user = await (UserModel as any).findByPk(id)
    if(user)
    return UserEntity.createFromDb(user);
    else
    throw new CustomError(500, 'Internal server error')
}
public async fetchByEmail(email:string){
  const user = await (UserModel as any).findOne({where: {email}})
  if(user)
  return UserEntity.createFromDb(user);
  else
  throw new CustomError(500, 'Internal server error')
}
  public async addUser(userEntity: UserEntity){
    if(userEntity.email && userEntity.password)
    {
        const result = await UserModel.create(userEntity);
        if(result)
        return UserEntity.createFromDb(result);
        if(!result)
        throw new CustomError(500, 'Internal server error')
    }
    else
    {
        throw new CustomError(400, 'Must provide a valid email and password')
    }
    }
    public async editUser(userEntity: UserEntity){
      if(userEntity.email && userEntity.password)
      {
          const result = await (UserModel as any).update(userEntity,{where: {id:userEntity.id}})
          if(result)
          return true
          if(!result)
          throw new CustomError(500, 'Internal server error')
      }
      else
      {
          throw new CustomError(400, 'Must provide a valid email and password')
      }
  }
  public async removeUser(userEntity: UserEntity){
      if(userEntity.id)
      {
          const result = await (UserModel as any).destroy({where: {id:userEntity.id}})
          if(result)
          return true
          if(!result)
          throw new CustomError(500, 'Internal server error')
      }
      else
      {
          throw new CustomError(400, 'Must provide an id')
      }
  }
}
export default SequelizeUserRepository