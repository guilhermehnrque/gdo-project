import { Request, Response } from "express";
import { CustomError } from "../../../application/erros/CustomError";
import { PlayersGroupFacade } from "../../../application/facade/players/PlayersGroupFacade";

export class PlayersGroupController {

    private playersGroupFacade: PlayersGroupFacade;

    constructor() {
        this.playersGroupFacade = new PlayersGroupFacade();
    }

    public async listGroups(request: Request, response: Response): Promise<Response> {
        try {
            const { userId } = request.params;
            const groups = await this.playersGroupFacade.listGroups(userId);
            
            return response.status(200).json(groups);
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