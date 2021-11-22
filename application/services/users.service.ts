import config from '../../infrastructure/config/db';
import MongooseUserRepository from '../../infrastructure/database/mongoose/repository/user.repository';
import SequelizeUserRepository from '../../infrastructure/database/sequelize/repository/user.repository';
let orm = config.orm === 'Mongoose' ? new MongooseUserRepository(): new SequelizeUserRepository()

class UsersService {
    public async createUser(email:string, password:string){
        let response = orm.create(email,password)
        return response
    }
}
export default UsersService
