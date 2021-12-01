import SequelizeUserRepository from '../../Infrastructure/MySqlrepository/sequelize/user.repository';
let repository = new SequelizeUserRepository()

class UsersService {
    public async createUser(email:string, password:string){
        let response = repository.addUser(email,password)
        return response
    }
}
export default UsersService
