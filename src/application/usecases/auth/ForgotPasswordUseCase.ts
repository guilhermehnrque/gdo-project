import crypto from 'crypto';
import { UserEntity } from '../../../domain/entity/UserEntity';
import { UserService } from '../../services/UserService';
import { EmailService } from '../../services/EmailService';

export class ForgotPasswordUseCase {

    private userService: UserService;
    private emailService: EmailService;

    constructor() {
        this.userService = new UserService();
        this.emailService = new EmailService();
    }

    async execute(email: string): Promise<void> {
        const user = await this.stepValidateEmailAndReturnUser(email);

        const { token, expiration } = await this.stepPrepareToken();

        await this.stepUpdateUserWithToken(user, token, expiration);

        this.stepSendEmail(email, token);
    }

    async stepValidateEmailAndReturnUser(email: string): Promise<UserEntity> {
        return await this.userService.getUserByEmail(email);
    }

    async stepPrepareToken() {
        const token = crypto.randomBytes(8).toString('hex');
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        console.log(`Token -> ${token}`);

        return { token, expiration };
    }

    async stepUpdateUserWithToken(user: UserEntity, token: string, expiration: Date): Promise<void> {
        user.reset_password_token = token;
        user.reset_password_expires = expiration;

        await this.userService.updateUser(user);
    }

    async stepSendEmail(email: string, token: string): Promise<void> {
        this.emailService.sendEmailForgotPassword(email, token);
    }
}