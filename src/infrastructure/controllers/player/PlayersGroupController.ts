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

            return response.status(200).json({ data: groups });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async groupDetail(request: Request, response: Response): Promise<Response> {
        try {
            const { userId, groupIdPk } = request.params;
            const group = await this.playersGroupFacade.groupDetail(userId, parseInt(groupIdPk));

            return response.status(200).json({ data: group });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async groupSchedule(request: Request, response: Response): Promise<Response> {
        try {
            const { groupIdPk } = request.params;
            const schedules = await this.playersGroupFacade.groupSchedule(parseInt(groupIdPk));

            return response.status(200).json({ data: schedules });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async groupRegister(request: Request, response: Response): Promise<Response> {
        try {
            const { userId } = request.params;
            const { groupId } = request.body
            await this.playersGroupFacade.groupRegister(parseInt(groupId), userId);

            return response.status(201).json({ message: 'User registered in group' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async groupLeave(request: Request, response: Response): Promise<Response> {
        try {
            const { userId } = request.params;
            const { groupIdPk } = request.params;

            await this.playersGroupFacade.groupLeave(parseInt(groupIdPk), userId);
            return response.status(201).json({ message: 'User has left the group' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async groupList(request: Request, response: Response): Promise<Response> {
        try {
            const { groupIdPk } = request.params;
            const lists = await this.playersGroupFacade.groupList(parseInt(groupIdPk));

            return response.status(200).json({ data: lists });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async registerGroupList(request: Request, response: Response): Promise<Response> {
        try {
            const { userId } = request.params;
            const { groupId } = request.body;
            await this.playersGroupFacade.registerGroupList(parseInt(groupId), userId);

            return response.status(201).json({ message: 'User registered in list' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async leaveGroupList(request: Request, response: Response): Promise<Response> {
        try {
            const { groupIdPk, userId } = request.params;
            await this.playersGroupFacade.leaveGroupList(parseInt(groupIdPk), userId);

            return response.status(201).json({ message: 'User has left the list' });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }


}