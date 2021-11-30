import UserEntity from '../../../../Domain/User/user.entity';
import UserRepositoryI from '../../interfaces/user.repository'
import UserModel from '../models/user'

class SequelizeUserRepository implements UserRepositoryI{
  public async create(email:string, password:string){
    try{
        if(email && password)
        {
            let user = UserEntity.createFromInput(email, password)
            let result = await UserModel.create(user);
            return UserEntity.createFromDb(result);
        }
        if(!email || !password)
          return ({user:null});
    }
    catch(err:any){
        return ({message:err.message});
    }
    }
}
export default SequelizeUserRepository