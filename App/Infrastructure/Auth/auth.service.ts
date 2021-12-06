import * as jwt from 'jsonwebtoken';
import AuthRepositoryI  from '../../Application/Auth/auth.interface';
import AuthToken from '../../Application/Auth/auth.token';
import UserEntity from '../../Domain/User/user.entity';

abstract class AuthService implements AuthRepositoryI{
    async verifyToken(bearerToken:AuthToken): Promise<boolean>
    {
        try {
            const response = jwt.verify(bearerToken.token, 'secretkey')
            if(response)
            return true
            else
            return false
          } catch(err) {
            return false
          }
    }
    async generateToken(user:UserEntity): Promise<AuthToken>
    {
        jwt.sign({user}, 'secretkey', (err:any, token:any) => {
            return new AuthToken(token)
        });
    }
    async verifyCredentials(user: UserEntity, password: string): Promise<boolean> {
        if (user && user.password === password) {
            return true;
        } else {
            return false;
        }
    }
    abstract login(user:UserEntity): Promise<AuthToken>
}

export default AuthService;