import { Request, Response } from "express";
import AuthGateway from "../gateways/AuthGatewayImpl";
import CustomError from "../../application/erros/CustomError";

class AuthController {

    private authGateway: AuthGateway;

    constructor() {
        this.authGateway = new AuthGateway();
    }

    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.authGateway.register(request);

            return response.status(201).json({ message: "O usuário foi registrado :3", user });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }
    
    public async loginUser (request: Request, response: Response): Promise<Response> {
        try {
            const token = await this.authGateway.login(request);
            return response.status(200).json({ token });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async forgotPassword(request: Request, response: Response): Promise<Response> {
        try{
            await this.authGateway.forgotPassword(request);
            return response.status(200).json({ message: "A solitição de reset de senha foi enviado para o seu email" });
        } catch (error) { 
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async resetPassword(request: Request, response: Response): Promise<Response> {
        try{
            await this.authGateway.resetPassword(request);
            return response.status(200).json({ message: "A sua senha foi resetada :3" });
        } catch (error) { 
            const { statusCode = 500, message } = error as CustomError;
            console.error(error)
            return response.status(statusCode).json({ error: message });
        }
    }

}

export default AuthController;
