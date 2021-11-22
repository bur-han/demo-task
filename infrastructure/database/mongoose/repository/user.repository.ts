import UserRepositoryI from '../../interfaces/user.repository'
import UserModel from '../models/user'

class MongooseUserRepository implements UserRepositoryI{
  public async create(email:string, password:string){
        try{
            if(email && password)
            {
                let user = new (UserModel as any)({
                    email: email,
                    password:password
                })
                      await user.save()
                      return ({user:user});
            }
            else
            return ({user:null});
        }
        catch(err:any){
            return ({message:err.message});
        }
    }
}
export default MongooseUserRepository