import AuthRepositoryImpl from '../../../infrastructure/repositories/AuthRepositoryImpl';
import HashPassword from '../../configs/HashPassword';
import logger from '../../configs/LoggerConfig';
import { LoginUserRequest } from '../../requests/auth/LoginUserRequest';
import Jwt from '../../configs/Jwt';
import LoginError from '../../erros/LoginError';
import { User } from '../../../domain/models/UserModel';

export class LoginUserUseCase {

    private authRepository: AuthRepositoryImpl;
    private errorMessage: string = '[LoginUserUseCase] Usuário ou senha inválidos ->';

    constructor() {
        this.authRepository = new AuthRepositoryImpl();
    }

    async execute(loginUserRequest: LoginUserRequest): Promise<string> {
        const user = await this.checkAndGetUser(loginUserRequest.login);

        if (user) {
            await this.validatePassword(loginUserRequest.password, user.password, user.login);
        }

        return user ? Jwt.generateToken(user.toJSON()) : '';
    }

    private async checkAndGetUser(userLogin: string): Promise<User | null> {
        const user = await this.authRepository.getUserByLogin(userLogin);

        if (!user) {
            this.logAndThrow(new LoginError(), `${this.errorMessage} ${userLogin}`);
        }

        return user;
    }

    private async validatePassword(password: string, hash: string, login:string) {
        const isValid = await HashPassword.comparePassword(password, hash);

        if (!isValid) {
            this.logAndThrow(new LoginError(), `${this.errorMessage} ${login} `);
        }

    }

    logAndThrow(error: Error, context: string) {
        logger.error(`${context}`);
        throw error;
    }
}