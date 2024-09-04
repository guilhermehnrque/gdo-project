import { UserRepositoryImpl } from '../../../infrastructure/repositories/UserRepositoryImpl';
import { UserEntity } from '../../../domain/entity/UserEntity';
import { UserService } from '../../services/UserService';
import { UserTypes } from '../../../domain/enums/UserTypes';

export class RegisterUserUseCase {

    private userRepository: UserRepositoryImpl;
    private userService: UserService;

    constructor() {
        this.userRepository = new UserRepositoryImpl();
        this.userService = new UserService();
    }

    async execute(name: string, surname: string, email: string, type: UserTypes, login: string, password: string, phoneNumber: number): Promise<void> {
        this.validations(login, email, phoneNumber);
        const isUserRegister = true;

        const userRegisterPayload = {
            name,
            surname,
            email,
            type,
            status: isUserRegister,
            login,
            password,
            phone_number: phoneNumber,
        }

        const userEntity = await UserEntity.createFromUseCase(userRegisterPayload);

        await this.userRepository.create(userEntity);
    }

    private validations(login: string, email: string, phoneNumber: number) {
        this.userService.checkIfUserExists(login, email, phoneNumber);
    }

}
