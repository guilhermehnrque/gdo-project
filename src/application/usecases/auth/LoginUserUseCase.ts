import { JwtService } from '../../../application/services/JwtService';
import { UserService } from '../../services/UserService';
import { UserEntity } from '../../../domain/entity/UserEntity';
import logger from '../../utils/LoggerConfig';

export class LoginUserUseCase {

    private jwtService: JwtService
    private userService: UserService

    constructor() {
        this.jwtService = new JwtService();
        this.userService = new UserService();
    }

    async execute(login: string, password: string): Promise<string> {
        const user = await this.stepValidateLoginAndReturnUser(login, password);
        return await this.setpValidateJwtAndReturnToken(user);
    }

    private async stepValidateLoginAndReturnUser(login: string, password: string): Promise<UserEntity> {
        await this.userService.checkIfUserNotExists(login);

        const user = await this.userService.getUserByLogin(login);

        await this.userService.validateUserPassword(password, user.password, user.login);

        return user;
    }

    private async setpValidateJwtAndReturnToken(user: UserEntity): Promise<string> {
        const latesToken = await this.jwtService.getLatestValidToken(user);

        await this.jwtService.saveToken(user.id, latesToken!.toString());

        return latesToken!.toString();
    }

    logAndThrow(error: Error, context: string) {
        logger.error(`${context}`);
        throw error;
    }
}