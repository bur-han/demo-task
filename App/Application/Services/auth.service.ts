import SequelizeAuthRepository from '../../Infrastructure/MySqlrepository/sequelize/auth.repository';
import {LoginInputI} from '../../Domain/Interfaces/auth.repository'
let repository = new SequelizeAuthRepository()

class AuthService {
    public async login(code?:LoginInputI, email?:LoginInputI,password?:LoginInputI){
        let response = repository.login(code, email,password)
        return response
    }
}
export default AuthService