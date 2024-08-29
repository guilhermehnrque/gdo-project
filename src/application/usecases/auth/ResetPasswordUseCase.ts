import logger from '../../../infrastructure/configs/LoggerConfig';
import CustomError from "../../erros/CustomError";
import { User } from "../../../domain/models/UserModel";
import HashPassword from "../../../infrastructure/configs/HashPassword";
import { ResetPasswordRequest } from '../../../infrastructure/requests/auth/ResetPasswordRequest';
import InvalidTokenError from '../../erros/InvalidTokenError';
import UserService from '../../services/UserService';
import { JwtService } from '../../services/JwtService';

export class ResetPasswordUseCase {

    private userService: UserService;
    private jwtService: JwtService;

    constructor() {
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    async execute(payload: ResetPasswordRequest, token: string): Promise<void> {
        const { password } = payload;

        const user = await this.getUserIfExists(token);

        if (!user) {
            this.logAndThrowError(new InvalidTokenError("Token expirado"), `[ResetPasswordUseCase] Token inválido -> ${payload.email}`);
        }

        const hashedPassword = await HashPassword.hashPassword(password);
        user!.password = hashedPassword;
        user!.reset_password_token = null;
        user!.reset_password_expires = null;

        await this.userService.save(user!);

        await this.jwtService.expireLatestToken(user!.id);
    }

    private async getUserIfExists(userToken: string): Promise<User | null> {
        return await this.userService.getUserByResetToken(userToken);
    }

    private logAndThrowError(error: CustomError, context: string): void {
        logger.error(context);
        throw error;
    }

}