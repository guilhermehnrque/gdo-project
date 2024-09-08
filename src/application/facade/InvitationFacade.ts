import { Request } from "express";
import { CreateInvitationRequest } from "../../infrastructure/requests/invitation/CreateInvitationRequest";
import { CreateInvitationUseCase } from "../usecases/invitation/CreateInvitationUseCase";
import { GetInvitationUseCase } from "../usecases/invitation/GetInvitationUseCase";
import { HandleInvitationResponseUseCase } from "../usecases/invitation/HandleInvitationResponseUseCase";

export class InvitationFacade {

    private createInvitationUseCase: CreateInvitationUseCase;
    private getInvitationUseCase: GetInvitationUseCase;
    private handlerInvitationResponseUseCase: HandleInvitationResponseUseCase;

    constructor() {
        this.createInvitationUseCase = new CreateInvitationUseCase();
        this.getInvitationUseCase = new GetInvitationUseCase();
        this.handlerInvitationResponseUseCase = new HandleInvitationResponseUseCase();
    }

    public async createInvitation(request: Request): Promise<string> {
        const userId = request.userId as string;
        const red = request as CreateInvitationRequest;
        const { guest_id, group_id } = red.body.invite;

        return this.createInvitationUseCase.execute(guest_id, group_id, userId);
    }

    public async getInvitationByCode(request: Request): Promise<Object> {
        const userId = request.userId as string;
        const invitationCode = request.params.invitationCode;

        return this.getInvitationUseCase.execute(invitationCode, userId);
    }

    public async acceptOrRecuseInvitationByCode(request: Request): Promise<boolean> {
        const userId = request.userId as string;
        const invitationCode = request.params.invitationCode;
        const status = request.params.status;

        return this.handlerInvitationResponseUseCase.execute(invitationCode, userId, status);
    }

}
