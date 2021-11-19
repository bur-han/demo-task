import jwt from 'jsonwebtoken';
import AuthRepositoryI from '../../interfaces/auth.interface'
import UserModel from '../models/sequelize.user'

class SequelizeAuthRepository implements AuthRepositoryI{
    public async login(email:any){
        try{
            var user = await (UserModel as any).findAll({where:{email: email}}, {raw:true})
            console.log(user)
            if(user.length > 0)
            {
                    return ({status:200});
            }
            else
            return ({message: 'No such email exists in system', status:400});
        }
        catch(err:any){
            return ({message: err.message, status:400});
        }
    }
}
export default SequelizeAuthRepository