import { InvitationRepositoryImpl } from "../../../infrastructure/repositories/InvitationRepositoryImpl";
import InvitationNotFoundError from "../../erros/invitation/InvitationNotFoundError";
import logger from "../../../infrastructure/configs/LoggerConfig";
import { InvitationDTO } from "../../dto/invitation/InvitationDTO";
import InvitationModel from "../../../domain/models/InvitationModel";
import UserRepositoryImpl from "../../../infrastructure/repositories/UserRepositoryImpl";
import { User } from "../../../domain/models/UserModel";

export class GetInvitationUseCase {

    private invitationRepository: InvitationRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.invitationRepository = new InvitationRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(invitationCode: string): Promise<InvitationDTO> {
        const invitation = await this.invitationRepository.getInvitationByCode(invitationCode);

        if (invitation == null || invitation == undefined) {
            this.logAndThrowError(new InvitationNotFoundError(), `Error getting invitation by code: ${invitationCode}`);
        }

        const invitedUser = await this.getUserId(invitation?.users_id!);
        const invitationUser = await this.getUserId(invitation?.created_by!);

        return this.invitationDTO(invitation!, invitedUser?.user_id!, invitationUser?.user_id!);
    }

    private async getUserId(id: number): Promise<User | null> {
        return await this.userRepository.getUserByPK(id);
    }

    private invitationDTO(invitation: InvitationModel, invitedId: string, invitationUser: string): InvitationDTO {
        return new InvitationDTO(
            invitation.code,
            invitation.status,
            invitation.is_expired,
            invitation.created_at,
            invitedId,
            invitation.groups_id,
            invitationUser,
            invitation.updated_at
        );
    }

    logAndThrowError(error: Error, message: string) {
        logger.error(`[GetInvitationUseCase] ${message} ${error.message}`);
        throw error;
    }
}