import { Request } from "express";
import { InvitationGatewayInterface } from "../../../application/interfaces/InvitationGatewayInterface";
import { CreateInvitationUseCase } from "../../../application/usecases/invitation/CreateInvitationUseCase";
import CreateInvitationRequest from "../../requests/invitation/CreateInvitationRequest";
import { GetInvitationUseCase } from "../../../application/usecases/invitation/GetInvitationUseCase";
import { InvitationDTO } from "../../../application/dto/invitation/InvitationDTO";


export class InvitationGatewayImpl implements InvitationGatewayInterface {

    private createInvitationUseCase: CreateInvitationUseCase;
    private getInvitationUseCase: GetInvitationUseCase;

    constructor() {
        this.createInvitationUseCase = new CreateInvitationUseCase();
        this.getInvitationUseCase = new GetInvitationUseCase();
    }

    async createInvitation(request: Request): Promise<string> {
        const userId = request.userId as string;
        const red = request as CreateInvitationRequest;
        const { guest_id, group_id } = red.body.invite;

        return this.createInvitationUseCase.execute(guest_id, group_id, userId);
    }

    getInvitationByCode(request: Request): Promise<InvitationDTO> {
        const invitationCode = request.params.invitationCode as string;

        return this.getInvitationUseCase.execute(invitationCode);
    }

    updateInvitationByCode(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    deleteInvitationByCode(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

}