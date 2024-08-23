import crypto from 'crypto';
import { Request } from 'express';
import logger from '../../../infrastructure/configs/LoggerConfig';
import { EmailAdapterImpl } from '../../../infrastructure/adapters/EmailAdapterImpl';
import EmailAttributesInterface from '../../interfaces/email/EmailAttributesInterface';
import CustomError from "../../erros/CustomError";
import UserNotFoundError from "../../erros/UserNotFoundError";
import { User } from "../../../domain/models/UserModel";
import AuthRepositoryImpl from "../../../infrastructure/repositories/AuthRepositoryImpl";
import { ForgotPasswordRequest } from '../../../infrastructure/requests/auth/ForgotPasswordRequest';

export class ForgotPasswordUseCase {

    private authRepository: AuthRepositoryImpl;
    private emailAdapter: EmailAdapterImpl;

    constructor() {
        this.authRepository = new AuthRepositoryImpl();
        this.emailAdapter = new EmailAdapterImpl();
    }

    async execute(payload: ForgotPasswordRequest, request: Request): Promise<void> {
        const user = await this.getUserIfExists(payload.email);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[ForgotPasswordUseCase] Usuário não encontrado -> ${payload.email}`);
        }
    
        const token = crypto.randomBytes(8).toString('hex');
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        console.log(`Token -> ${token}`);

        user!.reset_password_token = token;
        user!.reset_password_expires = expiration;

        try {
            await this.authRepository.save(user!);
        } catch (error) {
            const { message } = error as Error;
            this.logAndThrowError(new CustomError("Erro ao salvar token de recuperação de senha"), `[ResetPasswordUseCase] Erro no banco de dados -> ${message}`);
        }
        
        const email = user!.email;

        const mailOptions: EmailAttributesInterface = {
            to: email,
            subject: '[GDO] Recuperação de senha',
            text: `Você está recebendo esta mensagem porque você (ou outra pessoa) solicitou a redefinição da senha da sua conta.\n\n
                    Por favor, clique no link a seguir ou cole-o no seu navegador para concluir o processo:\n\n
                    http://${request.headers.host}/api/v1/auth/reset-password/${token}\n\n
                    Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá inalterada.\n`,
        };

        this.emailAdapter.sendEmail(mailOptions);
    }

    private async getUserIfExists(userEmail: string): Promise<User | null> {
        return await this.authRepository.getUserByEmail(userEmail);
    }

    private logAndThrowError(error: CustomError, context: string): void {
        logger.error(context);
        throw error;
    }

}