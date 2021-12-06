import AuthToken from "../../App/Application/Auth/auth.token";
import UserAuthService from "../../App/Infrastructure/Auth/user.auth.service";
import SequelizeUserRepository from "../../App/Infrastructure/MySqlrepository/user.repository";

class Authentication {
    static async authenticate(req:any, res:any, next:any){
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            const authToken = new AuthToken(token);
            const userAuthService = new UserAuthService(new SequelizeUserRepository);
            const result = await userAuthService.verifyToken(authToken);
            if(result){
                next();
            } else {
                res.status(401).json({
                    message: "You are not logged in!"
                });
            }
        } else {
            res.status(401).json({
                message: "You are not logged in!"
            });
        }
    }
}

export default Authentication;