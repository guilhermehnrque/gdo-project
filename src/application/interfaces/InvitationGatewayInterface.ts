import { Request } from "express";

export interface InvitationGatewayInterface {
    createInvitation(request: Request): Promise<any>;
    getInvitationByCode(request: Request): Promise<any>;
    updateInvitationByCode(request: Request): Promise<any>;
    deleteInvitationByCode(request: Request): Promise<any>;
}