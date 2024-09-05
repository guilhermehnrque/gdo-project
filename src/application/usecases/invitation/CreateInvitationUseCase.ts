// Entities
import { InvitationEntity } from "../../../domain/entity/InvitationEntity";

// Enums
import { InvitationStatus } from "../../../domain/enums/InvitationStatus";

// Models
import { Group } from "../../../domain/models/GroupModel";
import { User } from "../../../domain/models/UserModel";

// Adapters
import { EmailAdapterImpl } from "../../../infrastructure/adapters/EmailAdapterImpl";

// Configs
import logger from "../../utils/LoggerConfig";

// Repositories
import { GroupRepositoryImpl } from "../../../infrastructure/repositories/GroupRepositoryImpl";
import { InvitationRepositoryImpl } from "../../../infrastructure/repositories/InvitationRepositoryImpl";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepositoryImpl";

// Errors
import { CustomError } from "../../erros/CustomError";
import { GroupNotFoundError } from "../../erros/groups/GroupNotFoundError";
import InvitationPendingError from "../../erros/invitation/InvitationPendingError";
import { UserNotFoundError } from "../../erros/UserNotFoundError";


export class CreateInvitationUseCase {

    private invitationRepository: InvitationRepositoryImpl;
    private userRepository: UserRepositoryImpl;
    private groupRepository: GroupRepositoryImpl;
    private emailAdapter: EmailAdapterImpl;

    constructor() {
        this.invitationRepository = new InvitationRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
        this.groupRepository = new GroupRepositoryImpl();
        this.emailAdapter = new EmailAdapterImpl();
    }

    async execute(guestId: string, groupId: number, ownerInvitationUserId: string): Promise<string> {
        const user = await this.getUserByUserUserId(guestId);
        const userOwner = await this.getUserByUserId(ownerInvitationUserId);
        const group = await this.getGroupById(groupId);
        const hasInvitation = await this.validateIfUserHasInvitation(user.id, groupId);

        if (hasInvitation) {
            this.logAndThrowError(new InvitationPendingError(), `[CreateInvitationUseCase] User already has a pending invitation -> ${user.id}`);
        }

        const invitationEntity = await InvitationEntity.createFromPayload(group.id, user.id, InvitationStatus.PENDING, userOwner.id);

        await this.invitationRepository.createInvitation(invitationEntity);

        this.prepareEmail(user, group, invitationEntity.code);

        return invitationEntity.code;
    }

    async getUserByUserUserId(guestId: string): Promise<User> {
        const user = await this.userRepository.getUserByUserId(guestId);

        if (user == null) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async getUserByUserId(userId: string): Promise<User> {
        const user = await this.userRepository.getUserByUserId(userId);

        if (user == null) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async getGroupById(groupId: number): Promise<Group> {
        const group = await this.groupRepository.getGroupById(groupId);

        if (group == null) {
            throw new GroupNotFoundError();
        }

        return group
    }

    async validateIfUserHasInvitation(userId: number, groupId: number): Promise<boolean> {
        const invitation = await this.invitationRepository.getInvitationByStatusAndGroupId(InvitationStatus.PENDING, groupId);

        if (invitation == null) {
            return false;
        }

        return invitation.invited_user_id == userId;
    }

    private logAndThrowError(error: CustomError, context: string): void {
        logger.error(context);
        throw error;
    }

    private prepareEmail(user: User, group: Group, invitationCode: string): void {
        const email = user.email;

        const mailOptions = {
            to: email,
            subject: '[GDO] Convite para grupo',
            text: `Você foi convidado para participar do grupo ${group.description} no GDO.\n\n
                    Por favor, clique no link a seguir ou cole-o no seu navegador para aceitar o convite:\n\n
                    http://localhost:3000/invitation/accept/${invitationCode}\n\n
                    Se você não solicitou isso, por favor, ignore este e-mail.\n`,
        };

        this.emailAdapter.sendEmail(mailOptions);
    }

}
