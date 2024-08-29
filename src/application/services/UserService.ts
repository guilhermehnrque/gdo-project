// Importações de repositórios da infraestrutura
import { User } from '../../domain/models/UserModel';
import logger from '../../infrastructure/configs/LoggerConfig';
import UserRepository from '../../infrastructure/repositories/UserRepositoryImpl';
import UserNotFoundError from '../erros/UserNotFoundError';

export default class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserByLogin(login: string): Promise<User | null> {
        return await this.userRepository.getUserByLogin(login);
    }

    async getUserByResetToken(token: string): Promise<User | null> {
        return await this.userRepository.getUserByResetPasswordToken(token);
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await this.userRepository.getUserByUserId(userId);

        if (!user) {
            logger.error(`[UserService] User with id ${userId} not found`);
            throw new UserNotFoundError('Usuário não encontrado');
        }
        
        return user;
    }

}