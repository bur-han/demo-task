import AuthToken from "../../Application/Auth/auth.token";
import UserEntity from "../../Domain/User/user.entity";
import SequelizeUserRepository from "../MySqlrepository/user.repository";
import CustomError from "../Helpers/error";
import AuthService from "./auth.service";

class UserAuthService extends AuthService{
    public repository: SequelizeUserRepository
    constructor(repository: SequelizeUserRepository) {
        super();
        this.repository = repository
    }

    async login(user: UserEntity): Promise<AuthToken>{
        const {email, password} = user;
        const dbUser = await this.repository.fetchByEmail(email)
        const result = await this.verifyCredentials(dbUser, password);
        if (result){
            const token = await this.generateToken(user);
            return token;
        } else {
            throw new CustomError(400, 'Wrong credentials')
        }
    }

}

export default UserAuthService;