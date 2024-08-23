import { Request, Response } from "express";
import { LoginUserUseCase } from "../usecases/auth/LoginUserUseCase";
import { RegisterUserUseCase } from "../usecases/auth/RegisterUserUseCase";
import { ForgotPasswordUseCase } from "../usecases/auth/ForgotPasswordUseCase";
import { ResetPasswordUseCase } from "../usecases/auth/ResetPasswordUseCase";
import { LoginUserRequest } from "../requests/auth/LoginUserRequest";
import { RegisterUserRequest } from "../requests/auth/RegisterUserRequest";

export default class AuthGateway {

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
    
    async login(request: Request) {
        return this.loginUserUseCase.execute(request.body as LoginUserRequest);
    }
    
    async register(request: Request) {
        return this.registerUserUseCase.execute(request.body as RegisterUserRequest);
    }
    
    async forgotPassword(request: Request) {
        return this.forgotPasswordUseCase.execute(request.body, request);
    }
    
    async resetPassword(request: Request) {
        return this.resetPasswordUseCase.execute(request.body);
    }

}