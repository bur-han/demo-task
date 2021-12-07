import AuthTokenService from '../../App/Infrastructure/Services/auth.service';
import AuthService from '../../App/Infrastructure/Services/auth.service';
import SequelizeUserRepository from '../../App/Infrastructure/MySqlrepository/user.repository';

type AuthToken = string;
class Authentication {
  async authenticate(req: any, res: any, next: any) {
    if (req.headers.authorization) {
      const token: AuthToken = req.headers.authorization.split(' ')[1];
      const authService = new AuthService(new SequelizeUserRepository());
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
