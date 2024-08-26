import { InvitationEntity } from "../../domain/entity/InvitationEntity";
import { InvitationRepositoryInterface } from "../../domain/repositories/InvitationRepositoryInterface";
import InvitationModel from "../../domain/models/InvitationModel";
import CustomError from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";

export class InvitationRepositoryImpl implements InvitationRepositoryInterface {

    async createInvitation(invitationEntity: InvitationEntity): Promise<boolean> {
        try{
            await InvitationModel.create(invitationEntity.toRegister());
            return true;
        } catch (error) {  
            const customError = error as CustomError;
            throw new DatabaseError(`[InvitationRepositoryImpl] Error creating invitation: ${customError.message}`);
        }
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