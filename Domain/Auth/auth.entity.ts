import UserModel from "../../infrastructure/database/sequelize/models/user";
import JwtService from "../../infrastructure/services/jwt.service";
const jwtService = new JwtService()

class AuthEntity {
    static async loginWithJwt(email:string,password:string){
        try{
            let user = await (UserModel as any).findAll({where:{email: email,password:password}}, {raw:true})
            if(user.length > 0)
            {
                const token = await jwtService.signToken(user)
                console.log(token)
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
static async loginWithGoogle(email:string){
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
}

export default AuthEntity;