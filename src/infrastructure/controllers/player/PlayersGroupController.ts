import { Request, Response } from "express";
import { CustomError } from "../../../application/erros/CustomError";

export class PlayersGroupController {

    constructor() {
    }

    public async listGroups(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(200).json({ message: 'This is the group route' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async groupDetail(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(200).json({ message: 'This is the group detail route' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async groupList(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(200).json({ message: 'This is the group list route' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async registerGroupList(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(200).json({ message: 'This is the group list route' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateGroupListStatus(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(200).json({ message: 'This is the group list route' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async leaveGroup(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(200).json({ message: 'This is the group list route' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}