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

    async updateGroupById() {
        throw new Error("Method not implemented.");
    }

    async changeGroupStatus() {
        throw new Error("Method not implemented.");
    }

    async deleteGroupById() {
        throw new Error("Method not implemented.");
    }

    async addUserToGroup() {
        throw new Error("Method not implemented.");
    }

    async removeUserFromGroup() {
        throw new Error("Method not implemented.");
    }

}