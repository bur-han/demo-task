import AuthRepositoryI from '../../interfaces/auth.repository'
import JwtService from '../../../services/jwt.service';
import AuthEntity from '../../../../Domain/Auth/auth.entity';

class SequelizeAuthRepository implements AuthRepositoryI{
    public async loginWithGoogle(email:string){
        const response = AuthEntity.loginWithGoogle(email)
        return response
    }
    public async loginWithJwt(email:string,password:string){
        const response = AuthEntity.loginWithJwt(email,password)
        return response
    }
}
export default SequelizeAuthRepository