import UserEntity from '../../Domain/User/user.entity';
import CustomError from '../../Infrastructure/Exceptions/custom-error';
import SequelizeUserRepository from '../../Infrastructure/MySqlrepository/user.repository';
import AuthTokenService from '../../Infrastructure/Services/auth.service';
import { compareIt } from '../../Infrastructure/Services/bcrypt.service';
import { injectable, inject } from 'inversify';
import UserRepositoryI from '../../Domain/User/user.repository';
import TYPES from '../../Infrastructure/Inversify/types';

type AuthToken = string;

interface AuthRepositoryI {
  loginWithGoogle(session: any, email: string): Promise<AuthToken>;
  loginWithJwt(
    session: any,
    email: string,
    password: string
  ): Promise<AuthToken>;
}

@injectable()
class AuthService implements AuthRepositoryI {
  public authTokenService: AuthTokenService;
  public repository: SequelizeUserRepository;

  constructor(
    @inject(TYPES.UserRepositoryI) userRepository: UserRepositoryI,
    @inject(TYPES.AuthTokenService) authTokenService: AuthTokenService
  ) {
    this.repository = userRepository;
    this.authTokenService = authTokenService;
  }

  async loginWithGoogle(session: any, email: string): Promise<AuthToken> {
    const user = UserEntity.createFromInput(email, 'someRandomPassword');

    session.userId = user.id;
    const token = await this.authTokenService.generateToken(user.id);
    return token;
  }

  async loginWithJwt(
    session: any,
    email: string,
    password: string
  ): Promise<AuthToken> {
    const userEntity = UserEntity.createFromInput(email, password);
    const dbUser = await this.repository.fetchByEmail(email);

    if (await compareIt(password, dbUser.password)) {
      session.userId = userEntity.id;
      const token = await this.authTokenService.generateToken(userEntity.id);
      return token;
    } else {
      throw new CustomError(400, 'Wrong credentials');
    }
  }
}

export default AuthService;
