import { Request, Response } from "express";
import { InvitationFacade } from "../../application/facade/InvitationFacade";
import { CustomError } from "../../application/erros/CustomError";

export class InvitationController {

    private invitationFacade: InvitationFacade;

    constructor() {
        this.invitationFacade = new InvitationFacade();
    }

    async createInvitation(request: Request, response: Response) {
        try {
            const inviteCode = await this.invitationFacade.createInvitation(request);
            return response.status(201).json({
                message: "Convite criado ", data: {
                    invite_code: inviteCode
                }
            });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async getInvitationByCode(request: Request, response: Response) {
        try {
            const invitation = await this.invitationFacade.getInvitationByCode(request);
            return response.status(200).json(invitation);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async acceptOrRecuseInvitationByCode(request: Request, response: Response) {
        try {
            await this.invitationFacade.acceptOrRecuseInvitationByCode(request);
            return response.status(201).json({ message: "Convite atualizado" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}