import { Request, Response } from "express";
import { RegisterUserUseCase } from "../usecases/AuthUseCases/RegisterUserUseCase";

class AuthController {

    private registerUserUseCase: RegisterUserUseCase;

    constructor() {
        this.registerUserUseCase = new RegisterUserUseCase();
    }

    public async helloWorld(req: Request, res: Response): Promise<Response> {
        return res.json({ message: "Hello World" });
    }

    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.registerUserUseCase.execute();
            return response.json({ message: "User created", user });
        } catch (error) {
            let err = (error as Error);
            console.log(err.message);
            return response.status(400).json({ message: err.message });
        }
    }

}

export default AuthController;