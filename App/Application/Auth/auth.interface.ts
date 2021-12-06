import UserEntity from "../../Domain/User/user.entity";
import AuthToken from "./auth.token";

interface AuthRepositoryI {
    generateToken(user: UserEntity): Promise<AuthToken>
    verifyCredentials(user: UserEntity, password: string): Promise<boolean>
    verifyToken(authtoken: AuthToken): Promise<boolean>
    login(user: UserEntity): Promise<AuthToken>
}
export default AuthRepositoryI