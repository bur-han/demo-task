import UserEntity from '../../Domain/User/user.entity';
import PaginationOptions from '../../Domain/Utils/Pagination/pagination.options';
import SequelizeUserRepository from '../../Infrastructure/MySqlrepository/user.repository';

class UsersService {
public repository
    constructor(sequelizeUserRepository: SequelizeUserRepository){
        this.repository = sequelizeUserRepository
    }
    public async getUsers(pagination:PaginationOptions){
        return this.repository.fetchAll(pagination)
    }
    public async createUser(email:string, password:string){
        const userEntity = UserEntity.createFromInput(email, password)
        return this.repository.addUser(userEntity)
    }
    public async updateUser(id:string, body:any){
        const userEntity:UserEntity = await this.getUser(id);
        userEntity.email = body.email
        userEntity.password = body.password
        return this.repository.editUser(userEntity)
    }
    public async deleteUser(id:string){
        const userEntity:UserEntity = await this.getUser(id);
        return this.repository.removeUser(userEntity)
    }
    public async getUser(id:string){
        return this.repository.fetchById(id)
    }
}
export default UsersService
