import { InvitationEntity } from "../../domain/entity/InvitationEntity";
import { InvitationRepositoryInterface } from "../../domain/repositories/InvitationRepositoryInterface";
import InvitationModel from "../../domain/models/InvitationModel";
import CustomError from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";
import logger from "../configs/LoggerConfig";

export class InvitationRepositoryImpl implements InvitationRepositoryInterface {

    async createInvitation(invitationEntity: InvitationEntity): Promise<boolean> {
        try {
            await InvitationModel.create(invitationEntity.toRegister());
            return true;
        } catch (error) {
            const customError = error as CustomError;
            throw this.handleError(customError, `Error creating invitation: ${customError.message}`);
        }
    }

    async getInvitationByCode(invitationCode: string): Promise<InvitationModel | null> {
        try {
            return await InvitationModel.findOne({
                where: {
                    code: invitationCode
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw this.handleError(customError, `Error getting invitation: ${customError.message}`);
        }
    }

    updateInvitationByCode(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    deleteInvitationByCode(request: Request): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getInvitationByStatusAndGroupId(status: string, groupId: number, isExpired: boolean): Promise<InvitationModel | null> {
        try {
            return await InvitationModel.findOne({
                where: {
                    status: status,
                    groups_id: groupId,
                    is_expired: isExpired
                }
            });
        }
        catch (error) {
            const customError = error as CustomError;
            throw this.handleError(customError, 'Error getting invitation by status and group id');
        }
    }

    private handleError(error: CustomError, customMessage: string): CustomError {
        logger.error(`[InvitationRepositoryImpl] ${customMessage} ${error.message}`);
        return new DatabaseError(`[InvitationRepositoryImpl] ${customMessage} ${error.message}`);
    }

}