// Importações de configurações da infraestrutura
import logger from '../../../infrastructure/configs/LoggerConfig';

// Importações de solicitações de infraestrutura
import { LoginUserRequest } from '../../../infrastructure/requests/auth/LoginUserRequest';

// Importações de erros da aplicação
import LoginError from '../../erros/LoginError';

// Importações de modelos do domínio
import { User } from '../../../domain/models/UserModel';
import { JwtService } from '../../../application/services/JwtService';
import UserService from '../../services/UserService';

export class LoginUserUseCase {

    private jwtService: JwtService
    private userService: UserService

    private readonly errorMessage: string = '[LoginUserUseCase] Usuário ou senha inválidos ->';

    constructor() {
        this.jwtService = new JwtService();
        this.userService = new UserService();
    }

    async execute(loginUserRequest: LoginUserRequest): Promise<string> {
        const user = await this.checkAndGetUser(loginUserRequest.login);

        await this.validatePassword(loginUserRequest.password, user!.password, user!.login);

        const latesToken = await this.getLasteValidTokenIfIsActive(user!.id);

        if (latesToken != null || latesToken != undefined) {
            return latesToken;
        }

        const jwtToken = await this.jwtService.createToken(user!);

        await this.jwtService.saveToken(user!.id, jwtToken.toString());

        return jwtToken.toString();
    }

    private async checkAndGetUser(userLogin: string): Promise<User | null> {
        const user = await this.userService.getUserByLogin(userLogin);

        if (!user) {
            this.logAndThrow(new LoginError(), `${this.errorMessage} ${userLogin}`);
        }

        return user;
    }

    private async validatePassword(password: string, hash: string, login: string) {
        const isValid = await this.jwtService.checkPassword(password, hash, login);

        if (!isValid) {
            this.logAndThrow(new LoginError(), `${this.errorMessage} ${login} `);
        }

    }

    private async getLasteValidTokenIfIsActive(userId: number): Promise<string | null | undefined> {
        return await this.jwtService.getLatestValidToken(userId);
    }


    logAndThrow(error: Error, context: string) {
        logger.error(`${context}`);
        throw error;
    }
}