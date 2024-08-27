// Frameworks
import { Request } from "express";

// Interfaces
import { InvitationGatewayInterface } from "../../../application/interfaces/InvitationGatewayInterface";

// Use Cases
import { CreateInvitationUseCase } from "../../../application/usecases/invitation/CreateInvitationUseCase";
import { GetInvitationUseCase } from "../../../application/usecases/invitation/GetInvitationUseCase";
import { AcceptInvitationUseCase } from "../../../application/usecases/invitation/AcceptInvitationUseCase";

// Requests
import CreateInvitationRequest from "../../requests/invitation/CreateInvitationRequest";


export class InvitationGatewayImpl implements InvitationGatewayInterface {

    private createInvitationUseCase: CreateInvitationUseCase;
    private getInvitationUseCase: GetInvitationUseCase;
    private acceptInvitationUseCase: AcceptInvitationUseCase;

    constructor() {
        this.createInvitationUseCase = new CreateInvitationUseCase();
        this.getInvitationUseCase = new GetInvitationUseCase();
        this.acceptInvitationUseCase = new AcceptInvitationUseCase();
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

    async acceptInvitationByCode(request: Request): Promise<boolean> {
        const userId = request.userId as string;
        const invitationCode = request.params.invitationCode;

        return this.acceptInvitationUseCase.execute(invitationCode, userId);
    }

    deleteInvitationByCode(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

}