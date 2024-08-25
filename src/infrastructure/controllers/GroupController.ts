import { Request, Response } from "express";
import GroupGatewayImpl from "../gateways/organizer/GroupGatewayImpl";
import CustomError from "../../application/erros/CustomError";

export default class GroupController {

    private groupGateway: GroupGatewayImpl;

    constructor() {
        this.groupGateway = new GroupGatewayImpl();
    }

    async createGroup(request: Request, response: Response) {
        try {
            await this.groupGateway.createGroup(request);
            return response.status(201).json({ message: "O grupo foi criado :3" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async getUserGroupsByUserId(request: Request, response: Response) {
        try {
            const groups = await this.groupGateway.getUserGroupsByUserId(request);
            return response.status(200).json(groups);
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async getGroupById(request: Request, response: Response) {
        try {
            const group = await this.groupGateway.getGroupById(request);
            return response.status(200).json(group);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async updateGroupById(request: Request, response: Response) {
        try {
            const group = await this.groupGateway.updateGroupById(request);
            return response.status(201).json(group);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async changeGroupStatus(request: Request, response: Response) {
        try {
            const group = await this.groupGateway.changeGroupStatus(request);
            return response.status(204).json(group);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async deleteGroupById(request: Request, response: Response) {
        try {
            await this.groupGateway.deleteGroupById(request);
            return response.status(204).json();
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async addUserToGroup(request: Request, response: Response) {
        try {
            await this.groupGateway.addUserToGroup(request);
            return response.status(201).json({ message: "Usuário adicionado ao grupo com sucesso!" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async removeUserFromGroup(request: Request, response: Response) {
        try {
            await this.groupGateway.removeUsersFromGroup(request);
            return response.status(201).json({ message: "Usuário(s) removido do grupo!" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}