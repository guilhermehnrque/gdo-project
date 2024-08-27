import { Request, Response } from "express";
import { InvitationGatewayImpl } from "../gateways/organizer/InvitationGatewayImpl";
import CustomError from "../../application/erros/CustomError";

export class InvitationController {

    private invitationGateway: InvitationGatewayImpl;

    constructor() {
        this.invitationGateway = new InvitationGatewayImpl();
    }

    async createInvitation(request: Request, response: Response) {
        try {
            const inviteCode = await this.invitationGateway.createInvitation(request);
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
            const invitation = await this.invitationGateway.getInvitationByCode(request);
            return response.status(200).json(invitation);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async acceptInvitationByCode(request: Request, response: Response) {
        try {
            await this.invitationGateway.acceptInvitationByCode(request);
            return response.status(201).json({ message: "Convite aceito" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    async deleteInvitationByCode(request: Request, response: Response) {
        try {
            await this.invitationGateway.deleteInvitationByCode(request);
            return response.status(204).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }
}