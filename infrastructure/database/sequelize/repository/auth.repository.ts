import jwt from 'jsonwebtoken';
import AuthRepositoryI from '../../interfaces/auth.repository'
import UserModel from '../models/user'

class SequelizeAuthRepository implements AuthRepositoryI{
    public async loginWithGoogle(email:string){
        try{
            let user = await (UserModel as any).findOne({email: email}, {raw:true})
            if(user.length > 0)
            {
                    return ({user:user});
            }
            else
            return ({user:null});
        }
        catch(err:any){
            return ({message: err.message});
        }
    }
    public async loginWithJwt(email:string,password:string){
        try{
            let user = await (UserModel as any).findOne({email: email,password:password}, {raw:true})
            console.log(user)
            if(user.length > 0)
            {
                jwt.sign({user}, 'secretkey', (err:any, token:any) => {
                    return ({token:token});
                });
            }
            else
            return ({token:null});
        }
        catch(err:any){
            return ({message: err.message});
        }
    }
}
export default SequelizeAuthRepository