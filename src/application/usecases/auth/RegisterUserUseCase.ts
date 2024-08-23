import AuthRepositoryImpl from '../../../infrastructure/repositories/AuthRepositoryImpl';
import UserEntity from '../../../domain/entity/UserEntity';
import UserAlreadyExistsError from '../../erros/UserAlreadyExistsError';
import DatabaseError from '../../erros/DatabaseError';
import logger from '../../../infrastructure/configs/LoggerConfig';
import { RegisterUserRequest } from '../../../infrastructure/requests/auth/RegisterUserRequest'; 
import CustomError from '../../erros/CustomError';

export class RegisterUserUseCase {

    private authRepository: AuthRepositoryImpl;

    constructor() {
        this.authRepository = new AuthRepositoryImpl();
    }

    async execute(payload: RegisterUserRequest): Promise<void> {
        const userExists = await this.checkIfUserExists(payload.login);

        if (userExists) {
            this.logAndThrowError(new UserAlreadyExistsError(), "[RegisterUserUseCase] Usuário já registrado");
        }

        const userEntity = await UserEntity.createFromPayload(payload);

        try {
            await this.authRepository.create(userEntity);
        } catch (error) {
            const { message } = error as Error;
            this.logAndThrowError(new DatabaseError("Erro ao criar usuário"), `[RegisterUserUseCase] Erro no banco de dados -> ${message}`);
        }
    
    }

    private async checkIfUserExists(login: string): Promise<boolean> {
        const user = await this.authRepository.getUserByLogin(login);
        return user !== null;
    }

    private logAndThrowError(error: CustomError, context: string): void {
        logger.error(context);
        throw error;
    }

}
