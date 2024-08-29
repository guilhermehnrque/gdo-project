// Enums
import { InvitationStatus } from "../../../domain/enums/InvitationStatus";

// Models
import { User } from "../../../domain/models/UserModel";
import { Invitation as InvitationModel } from "../../../domain/models/InvitationModel";

// Repositories
import { InvitationRepositoryImpl } from "../../../infrastructure/repositories/InvitationRepositoryImpl";
import UserRepositoryImpl from "../../../infrastructure/repositories/UserRepositoryImpl";

// Errors
import InvitationNotFoundError from "../../erros/invitation/InvitationNotFoundError";
import InvitationAcceptError from "../../erros/invitation/InvitationAcceptError";

// Configs
import logger from "../../../infrastructure/configs/LoggerConfig";
import InvitationInvalidStatusError from "../../erros/invitation/InvitationInvalidStatusError";

export class HandleInvitationResponseUseCase {

    private invitationRepository: InvitationRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.invitationRepository = new InvitationRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(invitationCode: string, invitedUserId: string, status: string): Promise<boolean> {
        const invitedUser = await this.getUser(invitedUserId);
        const invitation = await this.invitationRepository.getInvitationByCodeAndUserId(invitationCode, invitedUser?.id!);

        await this.makeValidations(invitation!, invitationCode, invitedUser!);

        const statusEnum = this.validateAndgetStatusByEnum(status);

        invitation!.status = statusEnum.toString();

        return await this.invitationRepository.save(invitation!);
    }

    async makeValidations(invitation: InvitationModel, invitationCode: string, invitedUser: User): Promise<void> {
        if (!invitation) {
            throw new InvitationNotFoundError();
        }

        if (invitation.status != InvitationStatus.PENDING) {
            this.logAndThrowError(new InvitationAcceptError(), `Invitation ${invitationCode} already accepted or rejected`);
        }

        if (invitation.inviting_user_id == invitedUser.id) {
            this.logAndThrowError(new InvitationAcceptError(`You cannot accept you own invitation`), `User ${invitation.invited_user_id} cannot accept his own invitation`);
        }
    }

    private async getUser(id: string): Promise<User | null> {
        return await this.userRepository.getUserByUserId(id);
    }

    private validateAndgetStatusByEnum(status: string): InvitationStatus {
        const upperCaseStatus = status.toUpperCase();

        if ((upperCaseStatus !== InvitationStatus.ACCEPTED) && (upperCaseStatus !== InvitationStatus.REJECTED)) {
            throw new InvitationInvalidStatusError();
        }

        return InvitationStatus[status.toUpperCase() as keyof typeof InvitationStatus];
    }

    logAndThrowError(error: Error, message: string) {
        logger.error(`[GetInvitationUseCase] ${message} ${error.message}`);
        throw error;
    }

}