import UserEntity from '../../App/Domain/User/user.entity';
import AuthService from '../../App/Application/Services/auth.service';
import GoogleAuth from '../../App/Infrastructure/Services/google-auth.service';
import SequelizeUserRepository from '../../App/Infrastructure/MySqlrepository/user.repository';
import handleError from '../Util/error.handler';
import AuthTokenService from '../../App/Infrastructure/Services/auth.service';

const authService = new AuthService(
  new SequelizeUserRepository(),
  new AuthTokenService(new SequelizeUserRepository())
);
class AuthController {
  async loginUser(req: any, res: any) {
    try {
      const user = await authService.loginWithJwt(
        req.body.email,
        req.body.password
      );

      res.status(200).json({
        message: user,
      });
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  async getUrlForGoogleUser(req: any, res: any) {
    try {
      const googleAuth = new GoogleAuth();

      res.status(200).json({
        url: await googleAuth.urlGoogle(),
      });
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  async getGoogleUserProfile(req: any, res: any) {
    try {
      const googleAuth = new GoogleAuth();
      const user = await googleAuth.getUserProfile(req.query.code);
      const token = await authService.loginWithGoogle(user.email);

      res.status(200).json({
        message: 'User logged in successfully!',
        token,
      });
    } catch (err: any) {
      return handleError(err, res);
    }
  }
}

export default AuthController;
