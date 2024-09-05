import { Request, Response } from "express";
import { CustomError } from "../../application/erros/CustomError";
import { GroupFacade } from "../../application/facade/organizer/GroupFacade";
import { CreateGroupRequest } from "../requests/organizer/group/CreateGroupRequest";
import { CreateGroupDTO } from "../../application/dto/group/CreateGroupDTO";
import { CreateLocalDTO } from "../../application/dto/local/CreateLocalDTO";


export class GroupController {

    private groupFacade: GroupFacade;
    constructor() {
        this.groupFacade = new GroupFacade();
    }

    async createGroup(request: Request, response: Response) {
        try {
            const { userId } = request;
            const { group, local } = request.body as CreateGroupRequest;

            const createGroupDTO = new CreateGroupDTO(group);
            const createLocalDTO = new CreateLocalDTO(local);


            await this.groupFacade.createGroup(createGroupDTO, createLocalDTO, userId!);
            return response.status(201).json({ message: "Grupo e local registrado" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }


    async updateGroupById(request: Request, response: Response) {
        try {
            const group = await this.groupFacade.updateGroupById(request);
            return response.status(201).json(group);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async getUserGroupsByUserId(request: Request, response: Response) {
        try {
            const groups = await this.groupFacade.getUserGroupsByUserId(request);
            return response.status(200).json(groups);
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async getGroupById(request: Request, response: Response) {
        try {
            const group = await this.groupFacade.getGroupById(request);
            return response.status(200).json(group);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }


    async changeGroupStatus(request: Request, response: Response) {
        try {
            const group = await this.groupFacade.changeGroupStatus(request);
            return response.status(204).json(group);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async deleteGroupById(request: Request, response: Response) {
        try {
            await this.groupFacade.deleteGroupById(request);
            return response.status(204).json();
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async addUserToGroup(request: Request, response: Response) {
        try {
            await this.groupFacade.addUserToGroup(request);
            return response.status(201).json({ message: "Usuário adicionado ao grupo com sucesso!" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async removeUserFromGroup(request: Request, response: Response) {
        try {
            await this.groupFacade.removeUsersFromGroup(request);
            return response.status(201).json({ message: "Usuário(s) removido do grupo!" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async getGroupMembers(request: Request, response: Response) {
        try {
            const members = await this.groupFacade.getGroupMembers(request);
            return response.status(200).json(members);
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}