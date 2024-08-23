import { Request, Response } from "express";
import { RegisterUserUseCase } from "../usecases/AuthUseCases/RegisterUserUseCase";

class AuthController {

    private registerUserUseCase: RegisterUserUseCase;

    constructor() {
        const registerUserUseCase = new RegisterUserUseCase();
        this.registerUserUseCase = registerUserUseCase;
    }

    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.registerUserUseCase.execute(request.body);

            return response.json({ message: "Usuário registrado", user });
        } catch (error) {
            let err = (error as Error);
            console.log(err.message);
            return response.status(400).json({ message: err.message });
        }
    }

}

export default AuthController;
