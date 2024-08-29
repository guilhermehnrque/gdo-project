import AuthRepositoryImpl from '../../../infrastructure/repositories/UserRepositoryImpl';
import UserEntity from '../../../domain/entity/UserEntity';
import UserAlreadyExistsError from '../../erros/UserAlreadyExistsError';
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
        
        const isUserRegister = true;
        const userEntity = await UserEntity.createFromPayload(payload, isUserRegister);

        await this.authRepository.create(userEntity);

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
