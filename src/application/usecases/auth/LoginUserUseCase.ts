// Importações de repositórios da infraestrutura
import AuthRepositoryImpl from '../../../infrastructure/repositories/UserRepositoryImpl';

// Importações de configurações da infraestrutura
import HashPassword from '../../../infrastructure/configs/HashPassword';
import logger from '../../../infrastructure/configs/LoggerConfig';

// Importações de solicitações de infraestrutura
import { LoginUserRequest } from '../../../infrastructure/requests/auth/LoginUserRequest';

// Importações de erros da aplicação
import LoginError from '../../erros/LoginError';

// Importações de modelos do domínio
import { User } from '../../../domain/models/UserModel';
import { JwtService } from '../../../domain/services/JwtService';

export class LoginUserUseCase {

    private authRepository: AuthRepositoryImpl;
    private jwtService: JwtService

    private readonly errorMessage: string = '[LoginUserUseCase] Usuário ou senha inválidos ->';

    constructor() {
        this.authRepository = new AuthRepositoryImpl();
        this.jwtService = new JwtService();
    }

    async execute(loginUserRequest: LoginUserRequest): Promise<string> {
        const user = await this.checkAndGetUser(loginUserRequest.login);

        if (user) {
            await this.validatePassword(loginUserRequest.password, user.password, user.login);
        }

        const jwtToken = await this.jwtService.createToken(user!);

        await this.jwtService.saveToken(user!.id, jwtToken.toString());

        return jwtToken.toString();
    }

    private async checkAndGetUser(userLogin: string): Promise<User | null> {
        const user = await this.authRepository.getUserByLogin(userLogin);

        if (!user) {
            this.logAndThrow(new LoginError(), `${this.errorMessage} ${userLogin}`);
        }

        return user;
    }

    private async validatePassword(password: string, hash: string, login: string) {
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