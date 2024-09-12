import { InvitationEntity } from "../../domain/entity/InvitationEntity";
import { InvitationStatus, getStatusFromString } from "../../domain/enums/InvitationStatus";
import { Invitation } from "../../domain/models/InvitationModel";
import { InvitationRepositoryImpl } from "../../infrastructure/repositories/InvitationRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { InvitationPendingError } from "../erros/invitation/InvitationPendingError";
import logger from "../utils/LoggerConfig";

export class InvitationService {

    private invitationRepository: InvitationRepositoryImpl;
    private InvitationEntity: InvitationEntity;

    constructor() {
        this.invitationRepository = new InvitationRepositoryImpl();
        this.InvitationEntity = new InvitationEntity();
    }

    async getPendingInvitationByCodeAndUserId(invitationCode: string, userId: number): Promise<InvitationEntity> {
        const invitation = await this.invitationRepository.getInvitationByCodeAndUserId(invitationCode, userId);

        if (invitation == null) {
            this.logAndThrowError(new CustomError('Invitation not found'), `[InvitationService] getInvitationByCodeAndUserId: Invitation not found -> ${invitationCode}`);
        }

        if (invitation!.status != InvitationStatus.PENDING) {
            this.logAndThrowError(new CustomError('Invitation not pending'), `[InvitationService] getInvitationByCodeAndUserId: Invitation not pending -> ${invitationCode}`);
        }

        if (invitation!.expires_at < new Date()) {
            this.logAndThrowError(new CustomError('Invitation expired'), `[InvitationService] getInvitationByCodeAndUserId: Invitation expired -> ${invitationCode}`);
        }

        return await this.prepareEntity(invitation!);
    }

    async ensureUserHasInvitation(userId: number, groupId: number, InvitationStatus: string): Promise<void> {  
        const invitation = await this.invitationRepository.getInvitationByStatusAndGroupId(InvitationStatus, groupId);

        if (invitation != null || invitation!.invited_user_id != userId) {
            this.logAndThrowError(new InvitationPendingError(), `[InvitationService] ensureUserHasInvitation: User already has a pending invitation -> ${userId}`);
        }

    }

    async ensureUserIsTheOwnerOfInvitation(userId: number, invitationId: number): Promise<void> {

    }

    async ensureUserIsTheInvitedOfInvitation(userId: number, invitationId: number): Promise<void> {
    }

    private prepareEntity(invitation: Invitation): Promise<InvitationEntity> {
        return this.InvitationEntity.fromRepository({
            id: invitation.id,
            code: invitation.code,
            group_id: invitation.groups_id,
            invited_user_id: invitation.invited_user_id,
            status: getStatusFromString(invitation.status),
            expires_at: invitation.expires_at,
            created_at: invitation.createdAt,
            updated_at: invitation.updatedAt,
            inviting_user_id: invitation.inviting_user_id
        });
    }

    private logAndThrowError(error: CustomError, context: string): void {
        logger.error(context);
        throw error;
    }

}