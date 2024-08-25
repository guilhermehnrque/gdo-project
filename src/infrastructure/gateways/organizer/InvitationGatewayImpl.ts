import { Request } from "express";
import { InvitationGatewayInterface } from "../../../application/interfaces/InvitationGatewayInterface";


export class InvitationGatewayImpl implements InvitationGatewayInterface {
    
    createInvitation(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    getInvitationByCode(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    updateInvitationByCode(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    deleteInvitationByCode(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

}