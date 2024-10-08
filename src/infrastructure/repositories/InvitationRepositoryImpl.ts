import { InvitationEntity } from "../../domain/entity/InvitationEntity";
import { InvitationRepositoryInterface } from "../../domain/repositories/InvitationRepositoryInterface";
import { Invitation } from "../../domain/models/InvitationModel";
import { CustomError } from "../../application/erros/CustomError";

import DatabaseError from "../../application/erros/DatabaseError";
import logger from "../../application/utils/LoggerConfig";
import { Op } from "sequelize";

export class InvitationRepositoryImpl implements InvitationRepositoryInterface {

    async createInvitation(invitationEntity: InvitationEntity): Promise<boolean> {
        try {
            await Invitation.create(invitationEntity.toRegister());
            return true;
        } catch (error) {
            const customError = error as CustomError;
            throw this.handleError(customError, `Error creating invitation: ${customError.message}`);
        }
    }

    async save(invitation: Invitation): Promise<boolean> {

        const updateData = {
            status: invitation.status,
            updatedAt: new Date(),
            expires_at: invitation.expires_at,
            inviting_user_id: invitation.inviting_user_id,
            groups_id: invitation.groups_id,
            invitedUserId: invitation.invited_user_id
        };

        try {
            const [affectedCount] = await Invitation.update(updateData, {
                where: {
                    code: invitation.code
                },
            });

            return affectedCount > 0;
        } catch (error) {
            const customError = error as CustomError;
            throw this.handleError(customError, `Error saving invitation: ${customError.message}`);
        }
    }

    async getInvitationByCodeAndUserId(invitationCode: string, userIdPk: number): Promise<Invitation | null> {
        try {
            return await Invitation.findOne({
                where: {
                    [Op.or]: [
                        {
                            code: invitationCode,
                            invited_user_id: userIdPk
                        },
                        {
                            code: invitationCode,
                            inviting_user_id: userIdPk
                        }
                    ]
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw this.handleError(customError, `Error getting invitation: ${customError.message}`);
        }
    }

    async getInvitationByStatusAndGroupId(status: string, groupId: number): Promise<Invitation | null> {
        try {
            return await Invitation.findOne({
                where: {
                    status: status,
                    groups_id: groupId
                }
            });
        }
        catch (error) {
            const customError = error as CustomError;
            console.log(customError.message)
            throw this.handleError(customError, 'Error getting invitation by status and group id');
        }
    }

    private handleError(error: CustomError, customMessage: string): CustomError {
        logger.error(`[InvitationRepositoryImpl] ${customMessage} `);
        return new DatabaseError(`[InvitationRepositoryImpl] ${customMessage}`);
    }

}