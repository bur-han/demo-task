import AuthService from '../../App/Application/Services/auth.service';
import GoogleAuth from '../../App/Infrastructure/Services/google-auth.service';
import handleError from '../Util/error.handler';
import myContainer from '../../App/Infrastructure/Inversify/inversify.config';
import TYPES from '../../App/Infrastructure/Inversify/types';

const authService = myContainer.get<AuthService>(TYPES.AuthService);

class AuthController {
  static async loginUser(req: any, res: any) {
    try {
      const user = await authService.loginWithJwt(
        req.session,
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

  static async getUrlForGoogleUser(req: any, res: any) {
    try {
      const googleAuth = new GoogleAuth();

      res.status(200).json({
        url: await googleAuth.urlGoogle(),
      });
    } catch (err: any) {
      return handleError(err, res);
    }
  }

  static async getGoogleUserProfile(req: any, res: any) {
    try {
      const googleAuth = new GoogleAuth();
      const user = await googleAuth.getUserProfile(req.query.code);
      const token = await authService.loginWithGoogle(req.session, user.email);

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
