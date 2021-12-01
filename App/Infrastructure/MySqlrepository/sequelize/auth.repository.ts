import {AuthRepositoryI, LoginInputI} from '../../../Domain/Interfaces/auth.repository'
import GoogleService from '../../Services/google.service'
import JwtService from '../../Services/jwt.service'
import UserModel from '../../Database/sequelize/models/user'
const jwtService = new JwtService()
const googleService = new GoogleService()

class SequelizeAuthRepository implements AuthRepositoryI{
    public async login(code?:LoginInputI, email?:LoginInputI,password?:LoginInputI)
    {
        if(code)
        {
            try{
                let email = await googleService.getUserEmail(code)
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
        else
        {
            try{
                let user = await (UserModel as any).findAll({where:{email: email,password:password}}, {raw:true})
                if(user.length > 0)
                {
                    const token = await jwtService.signToken(user)
                    return ({token:token})
                    
                }
                else
                return ({token:null});
            }
            catch(err:any){
                console.log(err)
                return ({message: err.message});
            }
        }
      
    }
}
export default SequelizeAuthRepository