import UserEntity from '../../App/Domain/User/user.entity';
import GoogleAuthService from '../../App/Infrastructure/Auth/google.auth.service';
import UserAuthService from '../../App/Infrastructure/Auth/user.auth.service';
import GoogleAuth from '../../App/Infrastructure/Helpers/google.auth';
import SequelizeUserRepository from '../../App/Infrastructure/MySqlrepository/user.repository';

class AuthController {
    async loginUser (req: any, res:any) {
        try{
        const userEntity = UserEntity.createFromInput(req.body.email, req.body.password);
        const userAuthService = new UserAuthService(new SequelizeUserRepository);
        const user = await userAuthService.login(userEntity);
        res.status(200).json({
            message: user
        });
    }
    catch(err:any){
        res.status(err.statusCode).json({ message: err.message })
    }
    }
    async getUrlForGoogleUser(req:any, res:any) {
        try{
        const googleAuth = new GoogleAuth
        res.status(200).json({
            url: await googleAuth.urlGoogle()
        });
    }
    catch(err:any){
        res.status(err.statusCode).json({ message: err.message })
    }
    }

    async getGoogleUserProfile(req:any, res:any) {
        try{
        const googleAuth = new GoogleAuth();
        const result = await googleAuth.getUserProfile(req.query.code);
        const googleAuthService = new GoogleAuthService(new SequelizeUserRepository);
        const user = UserEntity.createFromInput(result.email, 'someRandomPassword');
        const token = await googleAuthService.login(user);

        res.status(200).json({
            message: "User logged in successfully!",
            token
        });
    }
    catch(err:any){
        res.status(err.statusCode).json({ message: err.message })
    }
    }

}
export default AuthController