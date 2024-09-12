// DTOs
import { InvitationDTO } from "../../dto/invitation/InvitationDTO";

// Mappers
import { mapInvitationToDTO } from "../../mappers/InvitationMapper";

// Configs
import logger from "../../utils/LoggerConfig";
import { InvitationService } from "../../services/InvitationService";
import { UserService } from "../../services/UserService";
import { InvitationEntity } from "../../../domain/entity/InvitationEntity";
import { UserEntity } from "../../../domain/entity/UserEntity";

export class GetInvitationUseCase {

    private userService: UserService;
    private InvitationService: InvitationService

    constructor() {
        this.userService = new UserService();
        this.InvitationService = new InvitationService();
    }

    async execute(invitationCode: string, userId: string): Promise<Object> {
        const user = await this.userService.getUserByUserId(userId);
        const invitation = await this.InvitationService.getPendingInvitationByCodeAndUserId(invitationCode, user?.id!)

        const invitationUser = await this.userService.getUserByIdPk(invitation!.inviting_user_id!)
        const invitedUser = await this.userService.getUserByIdPk(invitation!.invited_user_id!);

        this.validateUserPermissions(invitation!, invitationUser?.id!, invitedUser?.id!);

        const toInvitationDTO = await this.toInvitationDTO(invitation!, invitedUser!, invitationUser!);
        return toInvitationDTO.toResponse();
    }

    private validateUserPermissions(invitation: InvitationEntity, invitationUserId: number, invitedUserId: number): void {
        if (!this.isInvitationOwner(invitation, invitationUserId) || !this.isInvitedUser(invitation, invitedUserId)) {
            this.logAndThrowError(new Error(), `User ${invitedUserId} does not have permission to access invitation ${invitation.code}`);
        }
    }

    private isInvitationOwner(invitation: InvitationEntity, userId: number): boolean {
        return invitation.inviting_user_id === userId;
    }

    private isInvitedUser(invitation: InvitationEntity, userId: number): boolean {
        return invitation.invited_user_id === userId;
    }

    private async toInvitationDTO(invitation: InvitationEntity, invitedUser: UserEntity, invitingUser: UserEntity): Promise<InvitationDTO> {
        return mapInvitationToDTO(
            invitation,
            invitedUser,
            invitingUser
        );
    }

    logAndThrowError(error: Error, message: string) {
        logger.error(`[GetInvitationUseCase] ${message} ${error.message}`);
        throw error;
    }
}