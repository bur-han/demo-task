import AuthRepositoryI from '../../interfaces/auth.repository'
import UserModel from '../models/user'
import JwtService from '../../../services/jwt.service';
const jwtService = new JwtService()

class SequelizeAuthRepository implements AuthRepositoryI{
    public async loginWithGoogle(email:string){
        try{
            let user = await (UserModel as any).findAll({where:{email: email}}, {raw:true})
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
            let user = await (UserModel as any).findAll({where:{email: email,password:password}}, {raw:true})
            if(user.length > 0)
            {
                const token = jwtService.signToken(user)
                return ({token:token})
                
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