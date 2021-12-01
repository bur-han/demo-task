import UserEntity from '../../../Domain/User/user.entity';
import UserRepositoryI from '../../../Domain/Interfaces/user.repository'
import UserModel from '../../Database/sequelize/models/user'

class SequelizeUserRepository implements UserRepositoryI{
  public async addUser(email:string, password:string){
            let user = UserEntity.createFromInput(email, password)
            let result = await UserModel.create(user);
            return UserEntity.createFromDb(result);
    }
}
export default SequelizeUserRepository