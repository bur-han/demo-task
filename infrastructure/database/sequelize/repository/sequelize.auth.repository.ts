import jwt from 'jsonwebtoken';
import AuthRepositoryI from '../../interfaces/auth.interface'
import UserModel from '../models/sequelize.user'

class SequelizeAuthRepository implements AuthRepositoryI{
    public async login(email:any, password:any){
        try{
            var user = await (UserModel as any).findAll({where:{email: email, password: password}})
            if(user.length > 0)
            {
                jwt.sign({user}, 'secretkey', (err:any, token:any) => {
                    return ({token: token, status:200});
                });
            }
            else
            return ({message: 'Email or password does not match', status:400});
        }
        catch(err:any){
            return ({message: err.message, status:400});
        }
    }
}
export default SequelizeAuthRepository