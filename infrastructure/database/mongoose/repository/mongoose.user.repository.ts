import UserRepositoryI from '../../interfaces/user.interface'
import UserModel from '../models/mongoose.user'

class MongooseUserRepository implements UserRepositoryI{
  public async create(email:any, password:any){
        try{
            var user = new (UserModel as any)({
                email: email,
                password: password
            })
                  await user.save()
                  return ({user:user, status:201});
        }
        catch(err:any){
            return ({message:err.message, status:400});
        }
    }
}
export default MongooseUserRepository