// Models
import InvitationModel from "../../../domain/models/InvitationModel";
import { User } from "../../../domain/models/UserModel";

// DTOs
import { InvitationDTO } from "../../dto/invitation/InvitationDTO";

// Repositories
import { InvitationRepositoryImpl } from "../../../infrastructure/repositories/InvitationRepositoryImpl";
import UserRepositoryImpl from "../../../infrastructure/repositories/UserRepositoryImpl";

// Errors
import InvitationNotFoundError from "../../erros/invitation/InvitationNotFoundError";

// Configs
import logger from "../../../infrastructure/configs/LoggerConfig";

export class GetInvitationUseCase {

    private invitationRepository: InvitationRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.invitationRepository = new InvitationRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(invitationCode: string, userId: string): Promise<Object> {
        const user = await this.getUser(userId);
        const invitation = await this.invitationRepository.getInvitationByCodeAndUserId(invitationCode, user?.id!);

        if (!invitation) {
            this.logAndThrowError(new InvitationNotFoundError(), `Error getting invitation by code: ${invitationCode}`);
        }

        const invitationUser = await this.getUserByPk(invitation!.inviting_user_id);
        const invitedUser = await this.getUserByPk(invitation!.invited_user_id);

        this.validateUserPermissions(invitation!, invitationUser?.id!, invitedUser?.id!);

        return this.toInvitationDTO(invitation!, invitedUser?.user_id!, invitationUser?.user_id!)
                .toResponse();
    }

    private validateUserPermissions(invitation: InvitationModel, invitationUserId: number, invitedUserId: number): void {
        if (!this.isInvitationOwner(invitation, invitationUserId)) {
            this.logAndThrowError(new Error(), `User ${invitationUserId} is not the owner of the invitation ${invitation.code}`);
        }

        if (!this.isInvitedUser(invitation, invitedUserId)) {
            this.logAndThrowError(new Error(), `User ${invitedUserId} does not have permission to access invitation ${invitation.code}`);
        }
    }

    private isInvitationOwner(invitation: InvitationModel, userId: number): boolean {
        return invitation.inviting_user_id === userId;
    }

    private isInvitedUser(invitation: InvitationModel, userId: number): boolean {
        return invitation.invited_user_id === userId;
    }

    private async getUserByPk(id: number): Promise<User | null> {
        return this.userRepository.getUserByPK(id);
    }

    private async getUser(id: string): Promise<User | null> {
        return this.userRepository.getUserByUserId(id);
    }

    private toInvitationDTO(invitation: InvitationModel, invitedId: string, invitationUser: string): InvitationDTO {
        return new InvitationDTO(
            invitation.code,
            invitation.status,
            invitation.is_expired,
            invitation.created_at,
            invitedId,
            invitation.groups_id,
            invitationUser,
            invitation.expires_at
        );
    }

    logAndThrowError(error: Error, message: string) {
        logger.error(`[GetInvitationUseCase] ${message} ${error.message}`);
        throw error;
    }
}