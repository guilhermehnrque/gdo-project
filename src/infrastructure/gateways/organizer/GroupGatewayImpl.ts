import { Request } from "express";

// Interfaces
import GroupGatewayInterface from "../../../application/interfaces/GroupGatewayInterface";

// Use Cases
import CreateGroupUseCase from "../../../application/usecases/organizer/group/CreateGroupUseCase";
import CreateLocalUseCase from "../../../application/usecases/organizer/locals/CreateLocalUseCase";
import { GetGroupsUseCase } from "../../../application/usecases/organizer/group/GetGroupsUseCase";
import { GetGroupDetailsUseCase } from "../../../application/usecases/organizer/group/GetGroupDetailsUseCase";
import { UpdateGroupUseCase } from "../../../application/usecases/organizer/group/UpdateGroupUseCase";
import { UpdateGroupStatusUseCase } from "../../../application/usecases/organizer/group/UpdateGroupStatusUseCase";
import { RegisterGroupUserUseCase } from "../../../application/usecases/organizer/group/RegisterGroupUserUseCase";
import { RegisterUserGroupRequest } from "../../requests/organizer/group/RegisterUserGroupRequest";
import { RemoveGroupUserUseCase } from "../../../application/usecases/organizer/group/RemoveGroupUserUseCase";

// Requests
import { CreateGroupRequest } from "../../requests/organizer/group/CreateGroupRequest";
import { UpdateGroupRequest } from "../../requests/organizer/group/UpdateGroupRequest";

// DTOs
import CreateGroupDTO from "../../../application/dto/group/CreateGroupDTO";
import CreateLocalDTO from "../../../application/dto/local/CreateLocalDTO";
import { GroupDTO } from "../../../application/dto/group/GroupDTO";

// Mappers
import { mapGroupToDTO } from '../../../application/mappers/GroupMapper';
import sequelize from "../../database";


export default class GroupGatewayImpl implements GroupGatewayInterface {

    private createGroupUseCase: CreateGroupUseCase;
    private createLocalUseCase: CreateLocalUseCase;
    private getGroupsUseCase: GetGroupsUseCase;
    private getGroupDetailsUseCase: GetGroupDetailsUseCase;
    private updateGroupUseCase: UpdateGroupUseCase;
    private updateGroupStatusUseCase: UpdateGroupStatusUseCase;
    private registerGroupUserUseCase: RegisterGroupUserUseCase;
    private removeGroupUserUseCase: RemoveGroupUserUseCase;

    constructor() {
        this.createGroupUseCase = new CreateGroupUseCase();
        this.createLocalUseCase = new CreateLocalUseCase();
        this.getGroupsUseCase = new GetGroupsUseCase();
        this.getGroupDetailsUseCase = new GetGroupDetailsUseCase();
        this.updateGroupUseCase = new UpdateGroupUseCase();
        this.updateGroupStatusUseCase = new UpdateGroupStatusUseCase();
        this.registerGroupUserUseCase = new RegisterGroupUserUseCase();
        this.removeGroupUserUseCase = new RemoveGroupUserUseCase();
    }

    async createGroup(request: Request): Promise<boolean> {
        const req = request.body as CreateGroupRequest;
        const userId = request.userId as string;
        const createGroupDTO = CreateGroupDTO.createFromPayload(req);
        const createLocalDTO = CreateLocalDTO.createFromPayload(req);

        const transaction = await sequelize.transaction();
        let group: any = null;

        try {
            group = await this.createGroupUseCase.execute(await createGroupDTO, userId, transaction);
            await this.createLocalUseCase.execute(await createLocalDTO, group.id, transaction);

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

        await this.registerGroupUserUseCase.execute([group.users_id], userId, group.id, null);
        return group !== null;
    }

    async getUserGroupsByUserId(request: Request): Promise<any> {
        const userId = request.userId as string;
        const groups = await this.getGroupsUseCase.execute(userId);
        const groupDTOs = await Promise.all(groups.map(mapGroupToDTO));

        return groupDTOs;
    }

    async getGroupById(request: Request): Promise<GroupDTO> {
        const userId = request.userId as string;
        const groupId = parseInt(request.params.groupId);

        return await this.getGroupDetailsUseCase.execute(groupId, userId);
    }

    async updateGroupById(request: Request): Promise<any> {
        const userId = request.userId as string;
        const groupId = parseInt(request.params.groupId);
        const { description, status } = request.body as UpdateGroupRequest

        await this.updateGroupUseCase.execute(groupId, userId, description, status);
    }

    async changeGroupStatus(request: Request): Promise<any> {
        const userId = request.userId as string;
        const groupId = parseInt(request.params.groupId);
        const status = request.query.active as unknown as boolean;

        return this.updateGroupStatusUseCase.execute(groupId, userId, status);
    }

    async deleteGroupById(request: Request): Promise<any> {
        const userId = request.userId as string;
        const groupId = parseInt(request.params.groupId);
        const status = false;

        return this.updateGroupStatusUseCase.execute(groupId, userId, status);
    }

    async addUserToGroup(request: Request): Promise<void> {
        const { userId, groupId, req } = this.prepareData(request);

        const transaction = await sequelize.transaction();

        try {
            await this.registerGroupUserUseCase.execute(req.users_id, userId, groupId, null);
            transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }

    async removeUsersFromGroup(request: Request): Promise<void> {
        const { userId, groupId, req } = this.prepareData(request);

        const transaction = await sequelize.transaction();

        try {
            await this.removeGroupUserUseCase.execute(req.users_id, userId, groupId, null);
            transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    private prepareData(request: Request) {
        const userId = request.userId as string;
        const req = request.body as RegisterUserGroupRequest;
        const groupId = req.group_id

        return { userId, groupId, req }

    }


}
