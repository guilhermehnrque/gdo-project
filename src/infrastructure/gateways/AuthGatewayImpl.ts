import { Request } from "express";
import { AuthGateway } from "../../application/interfaces/AuthGateway";
import { LoginUserUseCase } from "../../application/usecases/auth/LoginUserUseCase";
import { RegisterUserUseCase } from "../../application/usecases/auth/RegisterUserUseCase";
import { ForgotPasswordUseCase } from "../../application/usecases/auth/ForgotPasswordUseCase";
import { ResetPasswordUseCase } from "../../application/usecases/auth/ResetPasswordUseCase";

// Requests
import { LoginUserRequest } from "../requests/auth/LoginUserRequest";
import { RegisterUserRequest } from "../requests/auth/RegisterUserRequest";
import { ForgotPasswordRequest } from "../requests/auth/ForgotPasswordRequest";
import { ResetPasswordRequest } from "../requests/auth/ResetPasswordRequest";

export default class AuthGatewayImpl implements AuthGateway {

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
        return this.forgotPasswordUseCase.execute(request.body as ForgotPasswordRequest, request);
    }
    
    async resetPassword(request: Request) {
        return this.resetPasswordUseCase.execute(request.body as ResetPasswordRequest, request.params.token);
    }

}