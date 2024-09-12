import { Request, Response } from "express";
import { CustomError } from "../../application/erros/CustomError";
import { GroupFacade } from "../../application/facade/organizer/GroupFacade";
import { CreateGroupRequest } from "../requests/organizer/group/CreateGroupRequest";
import { CreateGroupDTO } from "../../application/dto/group/CreateGroupDTO";
import { CreateLocalDTO } from "../../application/dto/local/CreateLocalDTO";
import { UpdateGroupRequest } from "../requests/organizer/group/UpdateGroupRequest";
import { RegisterUserGroupRequest } from "../requests/organizer/group/RegisterUserGroupRequest";


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
            console.log(error);
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }


    async updateGroupById(request: Request, response: Response) {
        try {
            const userId = request.userId as string;
            const groupId = parseInt(request.params.groupId);
            const { description, status, visibility } = request.body as UpdateGroupRequest;

            const group = await this.groupFacade.updateGroupById(groupId, userId, description, status, visibility);
            return response.status(201).json(group);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async getUserGroupsByUserId(request: Request, response: Response) {
        try {
            const userId = request.userId as string;
            const groups = await this.groupFacade.getUserGroupsByUserId(userId);
            return response.status(200).json(groups);
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async getGroupById(request: Request, response: Response) {
        try {
            const userId = request.userId as string;
            const groupId = parseInt(request.params.groupId);
            const group = await this.groupFacade.getGroupById(userId, groupId);

            return response.status(200).json(group);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async changeGroupStatus(request: Request, response: Response) {
        try {
            const userId = request.userId as string;
            const groupId = parseInt(request.params.groupId);
            const status = request.query.active as unknown as boolean;

            const group = await this.groupFacade.changeGroupStatus(groupId, userId, status);
            return response.status(204).json(group);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async deleteGroupById(request: Request, response: Response) {
        try {
            const userId = request.userId as string;
            const groupId = parseInt(request.params.groupId);

            await this.groupFacade.deleteGroupById(groupId, userId);
            return response.status(204).json();
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async addUserToGroup(request: Request, response: Response) {
        try {
            const req = request.body as RegisterUserGroupRequest;
            const userId = request.userId as string;
            const { group_id, users_id } = req

            await this.groupFacade.addUserToGroup(group_id, users_id, userId);
            return response.status(201).json({ message: "Usuário adicionado ao grupo com sucesso!" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async removeUserFromGroup(request: Request, response: Response) {
        try {
            const req = request.body as RegisterUserGroupRequest;
            const userId = request.userId as string;
            const { group_id, users_id } = req

            await this.groupFacade.removeUsersFromGroup(group_id, users_id, userId);
            return response.status(201).json({ message: "Usuário(s) removido do grupo!" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async getGroupMembers(request: Request, response: Response) {
        const { userId, groupId } = request.params;

        try {
            const members = await this.groupFacade.getGroupMembers(parseInt(groupId), userId);
            return response.status(200).json(members);
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}