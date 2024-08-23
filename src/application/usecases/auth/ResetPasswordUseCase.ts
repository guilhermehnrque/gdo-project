import logger from '../../configs/LoggerConfig';
import CustomError from "../../erros/CustomError";
import UserNotFoundError from "../../erros/UserNotFoundError";
import { User } from "../../../domain/models/UserModel";
import AuthRepositoryImpl from "../../../infrastructure/repositories/AuthRepositoryImpl";
import HashPassword from "../../configs/HashPassword";

export class ResetPasswordUseCase {

    private authRepository: AuthRepositoryImpl;

    constructor() {
        this.authRepository = new AuthRepositoryImpl();
    }

    async execute(payload: any): Promise<void> {
        const { token } = payload.params;
        const { password } = payload.body;

        const user = await this.getUserIfExists(token);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError("Token expirado"), `[ResetPasswordUseCase] Usuário não encontrado -> ${payload.email}`);
        }

        const hashedPassword = await HashPassword.hashPassword(password);
        user!.password = hashedPassword;
        user!.reset_password_token = null;
        user!.reset_password_expires = null;

        try {
            await this.authRepository.save(user!);
        } catch (error) {
            const { message } = error as Error;
            this.logAndThrowError(new CustomError("Erro ao salvar nova senha"), `[ResetPasswordUseCase] Erro no banco de dados -> ${message}`);
        }
    }

    private async getUserIfExists(userToken: string): Promise<User | null> {
        return await this.authRepository.getUserByToken(userToken);
    }

    private logAndThrowError(error: CustomError, context: string): void {
        logger.error(context);
        throw error;
    }

}