import { Request } from "express";
import { InvitationGatewayInterface } from "../../../application/interfaces/InvitationGatewayInterface";
import { CreateInvitationUseCase } from "../../../application/usecases/invitation/CreateInvitationUseCase";
import CreateInvitationRequest from "../../requests/invitation/CreateInvitationRequest";


export class InvitationGatewayImpl implements InvitationGatewayInterface {

    private createInvitationUseCase: CreateInvitationUseCase;

    constructor() {
        this.createInvitationUseCase = new CreateInvitationUseCase();
    }

    async createInvitation(request: Request): Promise<string> {
        const userId = request.userId as string;
        const red = request as CreateInvitationRequest;
        const { user_id, group_id } = red.body.invite;

        return this.createInvitationUseCase.execute(parseInt(user_id), group_id, userId);
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