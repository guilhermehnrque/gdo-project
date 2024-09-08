import { Request, Response } from "express";
import { CustomError } from "../../application/erros/CustomError";
import { AuthFacade } from "../../application/facade/AuthFacade";
import { LoginUserRequest } from "../requests/auth/LoginUserRequest";
import { RegisterUserRequest } from "../requests/auth/RegisterUserRequest";
import { ForgotPasswordRequest } from "../requests/auth/ForgotPasswordRequest";
import { ResetPasswordRequest } from "../requests/auth/ResetPasswordRequest";

export class AuthController {

    private authFacade: AuthFacade;

    constructor() {
        this.authFacade = new AuthFacade();
    }

    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const { name, surname, email, type, login, password, phoneNumber } = request.body as RegisterUserRequest;

            await this.authFacade.register(name, surname, email, type, login, password, phoneNumber);

            return response.status(201).json({ message: "O usuário foi registrado" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async loginUser(request: Request, response: Response): Promise<Response> {
        try {
            const { login, password } = request.body as LoginUserRequest;
            const token = await this.authFacade.login(login, password);

            return response.status(200).json({ token });
        } catch (error) {
            console.error(error)
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async forgotPassword(request: Request, response: Response): Promise<Response> {
        try {
            const { email } = request.body as ForgotPasswordRequest
            await this.authFacade.forgotPassword(email);

            return response.status(200).json({ message: "A solitição de reset de senha foi enviado para o seu email" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async resetPassword(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body as ResetPasswordRequest;
            const { token } = request.params;

            await this.authFacade.resetPassword(email, password, token);
            return response.status(200).json({ message: "A sua senha foi resetada :3" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            console.error(error)
            return response.status(statusCode).json({ error: message });
        }
    }

}
