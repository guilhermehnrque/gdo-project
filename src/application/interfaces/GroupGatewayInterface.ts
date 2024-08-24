import { Request } from "express";

export default interface GroupGatewayInterface {

    createGroup(request: Request): Promise<any>;

    getUserGroupsByUserId(request: Request): Promise<any>;

    getGroupById(request: Request): Promise<any>;

    updateGroupById(request: Request): Promise<any>;

    changeGroupStatus(request: Request): Promise<any>;

    deleteGroupById(request: Request): Promise<any>;

    addUserToGroup(request: Request): Promise<any>;

    removeUserFromGroup(request: Request): Promise<void>;

}
