// Importações de repositórios da infraestrutura
import { User } from '../../domain/models/UserModel';
import UserRepository from '../../infrastructure/repositories/UserRepositoryImpl';

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


}