import { Request, Response } from "express";
import { RegisterUserUseCase } from "../usecases/auth/RegisterUserUseCase";
import { LoginUserUseCase } from "../usecases/auth/LoginUserUseCase";
import CustomError from "../erros/CustomError";

class AuthController {

    private registerUserUseCase: RegisterUserUseCase;
    private loginUserUseCase: LoginUserUseCase;

    constructor() {
        const registerUserUseCase = new RegisterUserUseCase();
        const loginUserUseCase = new LoginUserUseCase();

        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
    }

    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.registerUserUseCase.execute(request.body);

            return response.status(201).json({ message: "Usuário registrado", user });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }
    
    public loginUser = async (request: Request, response: Response): Promise<Response> => {
        try {
            const token = await this.loginUserUseCase.execute(request.body);
            return response.status(200).json({ token });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}

export default AuthController;
