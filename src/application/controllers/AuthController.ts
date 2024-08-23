import { Request, Response } from "express";
import { RegisterUserUseCase } from "../usecases/auth/RegisterUserUseCase";
import { LoginUserUseCase } from "../usecases/auth/LoginUserUseCase";
import { ForgotPasswordUseCase } from "../usecases/auth/ForgotPasswordUseCase";
import { ResetPasswordUseCase } from "../usecases/auth/ResetPasswordUseCase";
import CustomError from "../erros/CustomError";

class AuthController {

    private registerUserUseCase: RegisterUserUseCase;
    private loginUserUseCase: LoginUserUseCase;
    private forgotPasswordUseCase: ForgotPasswordUseCase;
    private ResetPasswordUseCase: ResetPasswordUseCase;

    constructor() {
        this.registerUserUseCase = new RegisterUserUseCase();
        this.loginUserUseCase = new LoginUserUseCase();
        this.forgotPasswordUseCase = new ForgotPasswordUseCase();
        this.ResetPasswordUseCase = new ResetPasswordUseCase();
    }

    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.registerUserUseCase.execute(request.body);

            return response.status(201).json({ message: "O usuário foi registrado :3", user });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }
    
    public async loginUser (request: Request, response: Response): Promise<Response> {
        try {
            const token = await this.loginUserUseCase.execute(request.body);
            return response.status(200).json({ token });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async forgotPassword(request: Request, response: Response): Promise<Response> {
        try{
            await this.forgotPasswordUseCase.execute(request.body, request);
            return response.status(200).json({ message: "A solitição de reset de senha foi enviado para o seu email" });
        } catch (error) { 
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async performResetPassword(request: Request, response: Response): Promise<Response> {
        try{
            await this.ResetPasswordUseCase.execute(request);
            return response.status(200).json({ message: "A sua senha foi resetada :3" });
        } catch (error) { 
            const { statusCode = 500, message } = error as CustomError;
            console.error(error)
            return response.status(statusCode).json({ error: message });
        }
    }

}

export default AuthController;
