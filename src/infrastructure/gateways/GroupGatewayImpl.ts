import { Request } from "express";
import GroupGatewayInterface from "../../application/interfaces/GroupGatewayInterface";
import CreateGroupUseCase from "../../application/usecases/group/CreateGroupUseCase";
import { CreateGroupRequest } from "../requests/group/CreateGroupRequest";
import CreateGroupDTO from "../../application/dto/group/CreateGroupDTO";
import CreateListDTO from "../../application/dto/list/CreateListDTO";
import CreateLocalUseCase from "../../application/usecases/locals/CreateLocalUseCase";
import sequelize from "../../infrastructure/database";

export default class GroupGatewayImpl implements GroupGatewayInterface {

    private createGroupUseCase: CreateGroupUseCase;
    private createLocalUseCase: CreateLocalUseCase;

    constructor() {
        this.createGroupUseCase = new CreateGroupUseCase();
        this.createLocalUseCase = new CreateLocalUseCase();
    }

    async createGroup(request: Request): Promise<boolean> {
        const req = request.body as CreateGroupRequest;
        const userId = request.userId as string;
        const createGroupDTO = CreateGroupDTO.createFromPayload(req);
        const createListDTO = CreateListDTO.createFromPayload(req);

        const transaction = await sequelize.transaction();

        try {
            const group = await this.createGroupUseCase.execute(await createGroupDTO, userId, transaction);
            await this.createLocalUseCase.execute(await createListDTO, group.id, transaction);

            await transaction.commit();
            return group !== null;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }


    getUserGroupsByUserId(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
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