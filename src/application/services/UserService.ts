import { User } from '../../domain/models/UserModel';
import { UserRepositoryImpl } from '../../infrastructure/repositories/UserRepositoryImpl';
import { CustomError } from '../erros/CustomError';
import { UserAlreadyExistsError } from '../erros/UserAlreadyExistsError';
import { UserNotFoundError } from '../erros/UserNotFoundError';
import { UserEntity } from '../../domain/entity/UserEntity';
import { JwtService } from '../../application/services/JwtService';
import { LoginError } from '../erros/LoginError';
import logger from '../utils/LoggerConfig';

export class UserService {

    private userRepository: UserRepositoryImpl;
    private jwtService: JwtService = new JwtService();

    constructor() {
        this.userRepository = new UserRepositoryImpl();
        this.jwtService = new JwtService();
    }

    async getUserByLogin(login: string): Promise<UserEntity> {
        const user = await this.userRepository.getUserByLogin(login);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] getUserByLogin -> User not found ${login}`);
        }

        return UserEntity.createFromRepository(user!);
    }

    async getUserByEmail(email: string): Promise<UserEntity> { 
        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] getUserByEmail -> User not found ${email}`);
        }

        return await UserEntity.createFromRepository(user!);
    }

    async getUserByResetToken(token: string): Promise<UserEntity> {
        const user = await this.userRepository.getUserByResetPasswordToken(token);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] getUserByResetToken -> Invalid token ${token}`);
        }

        return await UserEntity.createFromRepository(user!);
    }

    async updateUser(user: UserEntity): Promise<number> {
        return await this.userRepository.updateUser(user);
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await this.userRepository.getUserByUserId(userId);

        if (!user) {
            logger.error(`[UserService] User with id ${userId} not found`);
            throw new UserNotFoundError('Usuário não encontrado');
        }

        return user;
    }

    public async checkIfUserExists(login: string, email: string, phoneNumber: number): Promise<void> {
        const user = await this.userRepository.getUserByLoginEmailOrPhone(login, email, phoneNumber);

        if (!user || user != null) {
            this.logAndThrowError(new UserAlreadyExistsError(), `[UserService] checkIfUserExists -> User already exists ${login}`);
        }

    }

    public async checkIfUserNotExists(login: string): Promise<void> {
        const user = await this.userRepository.getUserByLogin(login);

        if (user) {
            this.logAndThrowError(new UserAlreadyExistsError(), `[UserService] checkIfUserNotExists -> User do not exists ${login}`);
        }

    }

    public async validateUserPassword(password: string, hash: string, login: string): Promise<void> {
        const isValid = await this.jwtService.checkPassword(password, hash, login);

        if (!isValid) {
            this.logAndThrowError(new LoginError(), `[UserService] validateUserPassword -> Invalid password for user ${login}`);
        }

    }

    private logAndThrowError(error: CustomError, context: string): void {
        logger.error(context, error);
        throw error;
    }

}