import { Request } from "express";
import GroupGatewayInterface from "../../../application/interfaces/GroupGatewayInterface";
import CreateGroupUseCase from "../../../application/usecases/organizer/group/CreateGroupUseCase";
import { CreateGroupRequest } from "../../requests/group/CreateGroupRequest";
import RegisterUseToGroupUseCase  from "../../../application/usecases/organizer/group/RegisterUseToGroupUseCase";
import CreateGroupDTO from "../../../application/dto/group/CreateGroupDTO";
import CreateListDTO from "../../../application/dto/list/CreateListDTO";
import CreateLocalUseCase from "../../../application/usecases/organizer/locals/CreateLocalUseCase";
import sequelize from "../../database";

export default class GroupGatewayImpl implements GroupGatewayInterface {

    private createGroupUseCase: CreateGroupUseCase;
    private createLocalUseCase: CreateLocalUseCase;
    private registerUserToGroupUseCase: RegisterUseToGroupUseCase;

    constructor(

    ) {
        this.createGroupUseCase = new CreateGroupUseCase();
        this.createLocalUseCase = new CreateLocalUseCase();
        this.registerUserToGroupUseCase = new RegisterUseToGroupUseCase();
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