import AuthRepositoryImpl from '../../../infrastructure/repositories/AuthRepositoryImpl';
import UserEntity from '../../../domain/entity/UserEntity';
import UserAlreadyExistsError from '../../erros/UserAlreadyExistsError';
import logger from '../../configs/LoggerConfig';
import { RegisterUserRequest } from '../../requests/auth/RegisterUserRequest'; 

export class RegisterUserUseCase {

    private autoRepositoryImpl: AuthRepositoryImpl;

    constructor() {
        this.autoRepositoryImpl = new AuthRepositoryImpl();
    }

    async execute(payload: RegisterUserRequest): Promise<void> {
        const userExists = await this.checkIfUserExists(payload.login);

        if (userExists) {
            this.logAndThrowError(new UserAlreadyExistsError(), "[RegisterUserUseCase] Usuário já registrado");
        }

        const userEntity = await UserEntity.createFromPayload(payload);

        try {
            await this.autoRepositoryImpl.create(userEntity);
        } catch (error) {
            let err = (error as Error);
            this.logAndThrowError(new Error("Erro ao criar usuário"), `[RegisterUserUseCase] Erro no banco de dados -> ${err.message}`);
        }
    
    }

    private async checkIfUserExists(login: string): Promise<boolean> {
        const user = await this.autoRepositoryImpl.getUserByLogin(login);
        return user !== null;
    }

    private logAndThrowError(error: Error, context: string): void {
        logger.error(context);
        throw error;
    }

}
