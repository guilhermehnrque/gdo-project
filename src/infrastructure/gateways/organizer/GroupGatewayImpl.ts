import { Request } from "express";
import GroupGatewayInterface from "../../../application/interfaces/GroupGatewayInterface";
import CreateGroupUseCase from "../../../application/usecases/organizer/group/CreateGroupUseCase";
import { CreateGroupRequest } from "../../requests/organizer/group/CreateGroupRequest";
import CreateGroupDTO from "../../../application/dto/group/CreateGroupDTO";
import CreateLocalDTO from "../../../application/dto/local/CreateLocalDTO";
import CreateLocalUseCase from "../../../application/usecases/organizer/locals/CreateLocalUseCase";
import sequelize from "../../database";
import { GetGroupsUseCase } from "../../../application/usecases/organizer/group/GetGroupsUseCase";
import { GroupDTO } from '../../../application/dto/group/GroupDTO';
import { mapGroupToDTO } from '../../../application/mappers/GroupMapper';

export default class GroupGatewayImpl implements GroupGatewayInterface {

    private createGroupUseCase: CreateGroupUseCase;
    private createLocalUseCase: CreateLocalUseCase;
    private getGroupsUseCase: GetGroupsUseCase;

    constructor(

    ) {
        this.createGroupUseCase = new CreateGroupUseCase();
        this.createLocalUseCase = new CreateLocalUseCase();
        this.getGroupsUseCase = new GetGroupsUseCase();
    }

    async createGroup(request: Request): Promise<boolean> {
        const req = request.body as CreateGroupRequest;
        const userId = request.userId as string;
        const createGroupDTO = CreateGroupDTO.createFromPayload(req);
        const createLocalDTO = CreateLocalDTO.createFromPayload(req);

        const transaction = await sequelize.transaction();

        try {
            const group = await this.createGroupUseCase.execute(await createGroupDTO, userId, transaction);
            await this.createLocalUseCase.execute(await createLocalDTO, group.id, transaction);

            await transaction.commit();
            return group !== null;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }


    async getUserGroupsByUserId(request: Request): Promise<any> {
        const userId = request.userId as string;
        const groups = await this.getGroupsUseCase.execute(userId);
        const groupDTOs = await Promise.all(groups.map(mapGroupToDTO));

        return groupDTOs;
    }

    getGroupById(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    updateGroupById(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    changeGroupStatus(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    deleteGroupById(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    addUserToGroup(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    removeUserFromGroup(request: Request): Promise<void> {
        throw new Error("Method not implemented.");
    }

}