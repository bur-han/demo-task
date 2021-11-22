import config from '../../infrastructure/config/db';
import MongooseAuthRepository from '../../infrastructure/database/mongoose/repository/auth.repository';
import SequelizeAuthRepository from '../../infrastructure/database/sequelize/repository/auth.repository';
let orm = config.orm === 'Mongoose' ? new MongooseAuthRepository(): new SequelizeAuthRepository()

class AuthService {
    public async loginWithGoogle(email:string){
        let response = orm.loginWithGoogle(email)
        return response
    }
    public async loginWithJwt(email:string, password:string){
        let response = orm.loginWithJwt(email,password)
        return response
    }
}
export default AuthService