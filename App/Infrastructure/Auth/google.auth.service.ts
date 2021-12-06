import AuthToken from "../../Application/Auth/auth.token";
import UserEntity from "../../Domain/User/user.entity";
import CustomError from "../Helpers/error";
import SequelizeUserRepository from "../MySqlrepository/user.repository";
import AuthService from "./auth.service";

class GoogleAuthService extends AuthService{
    public repository: SequelizeUserRepository
    constructor(repository: SequelizeUserRepository) {
        super();
        this.repository = repository
    }
    async login(user:UserEntity): Promise<AuthToken>{
        const dbUser = await this.repository.fetchByEmail(user.email)
        if(dbUser)
        {
            const token = await this.generateToken(user);
            return token;
        }
        else {
            throw new CustomError(400, 'Wrong credentials')
        }
     
}
}

export default GoogleAuthService;