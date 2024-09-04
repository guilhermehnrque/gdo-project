import { LoginUserUseCase } from "../../application/usecases/auth/LoginUserUseCase";
import { RegisterUserUseCase } from "../../application/usecases/auth/RegisterUserUseCase";
import { ForgotPasswordUseCase } from "../../application/usecases/auth/ForgotPasswordUseCase";
import { ResetPasswordUseCase } from "../../application/usecases/auth/ResetPasswordUseCase";
import { UserTypes } from "../../domain/enums/UserTypes";

export class AuthFacade {

    private loginUserUseCase: LoginUserUseCase;
    private registerUserUseCase: RegisterUserUseCase;
    private forgotPasswordUseCase: ForgotPasswordUseCase;
    private resetPasswordUseCase: ResetPasswordUseCase;

    constructor() {
        this.loginUserUseCase = new LoginUserUseCase();
        this.registerUserUseCase = new RegisterUserUseCase();
        this.forgotPasswordUseCase = new ForgotPasswordUseCase();
        this.resetPasswordUseCase = new ResetPasswordUseCase();
    }

    async register(
        name: string,
        surname: string,
        email: string,
        type: UserTypes,
        login: string,
        password: string,
        phoneNumber: number) {

        return this.registerUserUseCase.execute(name, surname, email, type, login, password, phoneNumber);
    }

    async login(login: string, password: string): Promise<string> {
        return this.loginUserUseCase.execute(login, password);
    }

    async forgotPassword(email: string) {
        return this.forgotPasswordUseCase.execute(email);
    }

    async resetPassword(email: string, password: string, token: string) {
        return this.resetPasswordUseCase.execute(email, password, token);
    }

}