import AuthTokenService from '../../App/Infrastructure/Services/auth.service';
import TYPES from '../../App/Infrastructure/Inversify/types';
import myContainer from '../../App/Infrastructure/Inversify/inversify.config';

type AuthToken = string;

const authService = myContainer.get<AuthTokenService>(TYPES.AuthTokenService);

class Authentication {
  static async authenticate(req: any, res: any, next: any) {
    if (req.headers.authorization) {
      const token: AuthToken = req.headers.authorization.split(' ')[1];

      const result = await authService.verifyToken(token);

      if (result) {
        next();
      } else {
        res.status(401).json({
          message: 'You are not logged in!',
        });
      }
    } else {
      res.status(401).json({
        message: 'You are not logged in!',
      });
    }
  }
}

export default Authentication;
