import UserRepositoryI from '../../interfaces/user.interface'
import UserModel from '../models/sequelize.user'

class SequelizeUserRepository implements UserRepositoryI{
  public async create(email:any){
        try{
            var user = new (UserModel as any)({
                email: email
            })
                  await user.save()
                  return ({user:user, status:201});
        }
        catch(err:any){
            return ({message:err.message, status:400});
        }
    }
}
export default SequelizeUserRepository