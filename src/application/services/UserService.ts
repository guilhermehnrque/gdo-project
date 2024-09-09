import { User } from '../../domain/models/UserModel';
import { UserRepositoryImpl } from '../../infrastructure/repositories/UserRepositoryImpl';
import { CustomError } from '../erros/CustomError';
import { UserAlreadyExistsError } from '../erros/UserAlreadyExistsError';
import { UserNotFoundError } from '../erros/UserNotFoundError';
import { UserEntity } from '../../domain/entity/UserEntity';
import { JwtService } from '../../application/services/JwtService';
import { LoginError } from '../erros/LoginError';
import { UserNotStaffError } from '../erros/groups/UserNotStaffError';
import logger from '../utils/LoggerConfig';

export class UserService {

    private userRepository: UserRepositoryImpl;
    private jwtService: JwtService;

    constructor() {
        this.userRepository = new UserRepositoryImpl();
        this.jwtService = new JwtService();
    }

    async getUserByLogin(login: string): Promise<UserEntity> {
        const user = await this.userRepository.getUserByLogin(login);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] getUserByLogin -> User not found ${login}`);
        }

        return await this.prepareEntity(user!);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] getUserByEmail -> User not found ${email}`);
        }

        return await this.prepareEntity(user!);
    }

    async getUserByResetToken(token: string): Promise<UserEntity> {
        const user = await this.userRepository.getUserByResetPasswordToken(token);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] getUserByResetToken -> Invalid token ${token}`);
        }

        return await this.prepareEntity(user!);
    }

    async updateUser(user: UserEntity): Promise<number> {
        return await this.userRepository.updateUser(user);
    }

    async getUserByUserId(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.getUserByUserId(userId);

        if (!user) {
            logger.error(`[UserService] User with id ${userId} not found`);
            throw new UserNotFoundError('Usuário não encontrado');
        }

        return await this.prepareEntity(user);
    }

    async getUserByIdPk(userIdPk: number): Promise<UserEntity> {
        const user = await this.userRepository.getUserByPK(userIdPk);

        if (!user) {
            logger.error(`[UserService] User not found`);
            throw new UserNotFoundError('Usuário não encontrado');
        }

        return await this.prepareEntity(user);
    }

    public async checkIfUserExists(login: string, email: string, phoneNumber: number): Promise<void> {
        const user = await this.userRepository.getUserByLoginEmailOrPhone(login, email, phoneNumber);

        if (user || user != null) {
            this.logAndThrowError(new UserAlreadyExistsError(), `[UserService] checkIfUserExists -> User already exists ${login}`);
        }

    }

    public async checkIfUserNotExists(login: string): Promise<void> {
        const user = await this.userRepository.getUserByLogin(login);

        if (!user) {
            this.logAndThrowError(new UserAlreadyExistsError(), `[UserService] checkIfUserNotExists -> User do not exists ${login}`);
        }

    }

    public async validateUserPassword(password: string, hash: string, login: string): Promise<void> {
        const isValid = await this.jwtService.checkPassword(password, hash, login);

        if (!isValid) {
            this.logAndThrowError(new LoginError(), `[UserService] validateUserPassword -> Invalid password for user ${login}`);
        }

    }
    public async getUserAndCheckIfUserIsOrganizer(userId: string): Promise<UserEntity> {
        const user = await this.getUserByUserId(userId);

        if (!user || user.type != 'ORGANIZER') {
            this.logAndThrowError(new UserNotStaffError('Usuário não permitido para executar essa operação', 401), '[UserService] getUserAndCheckIfUserIsOrganizer -> User is not an organizer');
        }

        return user;
    }

    public async validateArrayOfUsers(users: Array<number>): Promise<void> {
        if (users.length === 0) {
            this.logAndThrowError(new UserNotFoundError(), '[UserService] validateArrayOfUsers -> Empty array');
        }

        const usersPromises = users.map(async user => {
            const usr = await this.getUserByUserId(user.toString());

            if (!usr) {
                this.logAndThrowError(new UserNotFoundError(), `[UserService] validateArrayOfUsers -> User not found ${user}`);
            }
        });

        await Promise.all(usersPromises);
    }

    private logAndThrowError(error: CustomError, context: string): void {
        logger.error(context, error);
        throw error;
    }

    private async prepareEntity(user: User): Promise<UserEntity> {
        return await UserEntity.createFromRepository({
            name: user.name,
            surname: user.surname,
            email: user.email,
            type: user.type,
            user_id: user.user_id,
            status: user.status,
            phone_number: user.phone_number,
            login: user.login,
            password: user.password,
            created_at: user.created_at,
            updated_at: user?.updated_at,
            deleted_at: user?.deleted_at,
            id: user.id,
            reset_password_expires: user?.reset_password_expires,
            reset_password_token: user?.reset_password_token
        });
    }

}