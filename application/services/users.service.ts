import config from '../../config';
import MongooseUserRepository from '../../infrastructure/database/mongoose/repository/mongoose.user.repository';
import SequelizeUserRepository from '../../infrastructure/database/sequelize/repository/sequelize.user.repository';
var orm = config.orm === 'Mongoose' ? new MongooseUserRepository(): new SequelizeUserRepository()

class UsersService {
    public async createUser(email:any){
        var response = orm.create(email)
        return response
    }
}
export default UsersService
