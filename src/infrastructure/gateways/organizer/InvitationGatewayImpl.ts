// Frameworks
import { Request } from "express";

// Interfaces
import { InvitationGatewayInterface } from "../../../application/interfaces/InvitationGatewayInterface";

// Use Cases
import { CreateInvitationUseCase } from "../../../application/usecases/invitation/CreateInvitationUseCase";
import { GetInvitationUseCase } from "../../../application/usecases/invitation/GetInvitationUseCase";
import { HandleInvitationResponseUseCase } from "../../../application/usecases/invitation/HandleInvitationResponseUseCase";

// Requests
import CreateInvitationRequest from "../../requests/invitation/CreateInvitationRequest";


export class InvitationGatewayImpl implements InvitationGatewayInterface {

    private createInvitationUseCase: CreateInvitationUseCase;
    private getInvitationUseCase: GetInvitationUseCase;
    private handlerInvitationResponseUseCase: HandleInvitationResponseUseCase;

    constructor() {
        this.createInvitationUseCase = new CreateInvitationUseCase();
        this.getInvitationUseCase = new GetInvitationUseCase();
        this.handlerInvitationResponseUseCase = new HandleInvitationResponseUseCase();
    }

    async createInvitation(request: Request): Promise<string> {
        const userId = request.userId as string;
        const red = request as CreateInvitationRequest;
        const { guest_id, group_id } = red.body.invite;

        return this.createInvitationUseCase.execute(guest_id, group_id, userId);
    }

    async getInvitationByCode(request: Request): Promise<Object> {
        const userId = request.userId as string;
        const invitationCode = request.params.invitationCode;

        return this.getInvitationUseCase.execute(invitationCode, userId);
    }

    async acceptOrRecuseInvitationByCode(request: Request): Promise<boolean> {
        const userId = request.userId as string;
        const invitationCode = request.params.invitationCode;
        const status = request.params.status;

        return this.handlerInvitationResponseUseCase.execute(invitationCode, userId, status);
    }

    deleteInvitationByCode(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

}