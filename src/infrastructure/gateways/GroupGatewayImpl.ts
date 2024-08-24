import { Request } from "express";
import GroupGatewayInterface from "../../application/interfaces/GroupGatewayInterface";
import CreateGroupUseCase from "../../application/usecases/group/CreateGroupUseCase";
import { CreateGroupRequest } from "../requests/group/CreateGroupRequest";

export default class GroupGatewayImpl implements GroupGatewayInterface {

    private createGroupUseCase: CreateGroupUseCase;

    constructor() {
        this.createGroupUseCase = new CreateGroupUseCase();
    }

    createGroup(request: Request): Promise<any> {
        const req = request.body as CreateGroupRequest;
        console.table(req);
        throw new Error("Method not implemented.");
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