import jwt from 'jsonwebtoken';
import config from '../../config';
import MongooseAuthRepository from '../../infrastructure/database/mongoose/repository/mongoose.auth.repository';
import SequelizeAuthRepository from '../../infrastructure/database/sequelize/repository/sequelize.auth.repository';
var orm = config.orm === 'Mongoose' ? new MongooseAuthRepository(): new SequelizeAuthRepository()

class AuthService {
    public async login(email:any){
        var response = orm.login(email)
        return response
    }
    public async verifyToken(header:any) {
        const bearerHeader = header;
        if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', ((err:any, authData:any) => {
            if(err)
            return ({message: err.message, status:403});
            
            else
            return ({user: authData.user, status:200});
          }));
        } else {
            return ({message: 'Forbiden', status:403});
        }
  }
}
export default AuthService