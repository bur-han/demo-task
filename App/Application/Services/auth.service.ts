import UserEntity from '../../Domain/User/user.entity';
import CustomError from '../../Infrastructure/Exceptions/custom-error';
import SequelizeUserRepository from '../../Infrastructure/MySqlrepository/user.repository';
import AuthTokenService from '../../Infrastructure/Services/auth.service';
import { compareIt } from '../../Infrastructure/Services/bcrypt.service';

type AuthToken = string;

interface AuthRepositoryI {
  loginWithGoogle(email: string, password: string): Promise<AuthToken>;
  loginWithJwt(email: string, password: string): Promise<AuthToken>;
}

class AuthService implements AuthRepositoryI {
  public authService: AuthTokenService;
  public repository: SequelizeUserRepository;

  constructor(
    repository: SequelizeUserRepository,
    authService: AuthTokenService
  ) {
    this.repository = repository;
    this.authService = authService;
  }

  async loginWithGoogle(email: string): Promise<AuthToken> {
    const user = UserEntity.createFromInput(email, 'someRandomPassword');

    localStorage.setItem('userId', user.id);
    const token = await this.authService.generateToken(user.id);
    return token;
  }

  async loginWithJwt(email: string, password: string): Promise<AuthToken> {
    const userEntity = UserEntity.createFromInput(email, password);
    const dbUser = await this.repository.fetchByEmail(email);

    if (await compareIt(password, dbUser.password)) {
      localStorage.setItem('userId', userEntity.id);
      const token = await this.authService.generateToken(userEntity.id);
      return token;
    } else {
      throw new CustomError(400, 'Wrong credentials');
    }
  }
}

export default AuthService;
