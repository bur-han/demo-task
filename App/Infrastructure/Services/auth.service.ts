import * as jwt from 'jsonwebtoken';
import config from '../Config/auth';
import SequelizeUserRepository from '../MySqlrepository/user.repository';
import { injectable, inject } from 'inversify';
import TYPES from '../Inversify/types';
import UserRepositoryI from '../../Domain/User/user.repository';

type AuthToken = string;

interface AuthRepositoryI {
  generateToken(userId: string): Promise<AuthToken>;
  verifyToken(authtoken: AuthToken): Promise<boolean>;
}

@injectable()
class AuthTokenService implements AuthRepositoryI {
  public repository: SequelizeUserRepository;

  constructor(@inject(TYPES.UserRepositoryI) repository: UserRepositoryI) {
    this.repository = repository;
  }

  async verifyToken(bearerToken: AuthToken): Promise<boolean> {
    try {
      const response = jwt.verify(bearerToken, config.secret);
      if (!response) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async generateToken(userId: String): Promise<AuthToken> {
    return jwt.sign({ userId }, config.secret);
  }
}

export default AuthTokenService;
