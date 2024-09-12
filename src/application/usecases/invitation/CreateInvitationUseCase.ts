// Entities
import { InvitationEntity } from "../../../domain/entity/InvitationEntity";

// Enums
import { InvitationStatus } from "../../../domain/enums/InvitationStatus";


// Repositories
import { InvitationRepositoryImpl } from "../../../infrastructure/repositories/InvitationRepositoryImpl";

// Errors
import { UserService } from "../../services/UserService";
import { UserEntity } from "../../../domain/entity/UserEntity";
import { GroupService } from "../../services/GroupService";
import { EmailService } from "../../services/EmailService";
import { InvitationService } from "../../services/InvitationService";

export class CreateInvitationUseCase {

    private invitationRepository: InvitationRepositoryImpl;
    private userService: UserService;
    private groupService: GroupService;
    private emailService: EmailService;
    private InvitationService: InvitationService;
    private invitationEntity: InvitationEntity;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.emailService = new EmailService();
        this.InvitationService = new InvitationService();
        this.invitationRepository = new InvitationRepositoryImpl();
        this.invitationEntity = new InvitationEntity();
    }

    async execute(guestId: string, groupId: number, ownerInvitationUserId: string): Promise<string> {
        const user = await this.getUserByUserId(guestId);
        const userOwner = await this.getUserByUserId(ownerInvitationUserId);
        const group = await this.groupService.getGroupById(groupId);

        await this.InvitationService.ensureUserHasInvitation(user.id, group.id!, InvitationStatus.PENDING);

        const invitation = await this.invitationEntity.fromUseCase({
            group_id: group.id,
            invited_user_id: user.id,
            status: InvitationStatus.PENDING, 
            inviting_user_id: userOwner.id
        });

        await this.invitationRepository.createInvitation(invitation!);

        this.sendEmail(user.email, group.description, invitation.getInvitationCode()!);

        return invitation.getInvitationCode()!;
    }

    async getUserByUserId(userId: string): Promise<UserEntity> {
        return await this.userService.getUserByUserId(userId);
    }

    private sendEmail(email: string, invitationCode: string, description: string): void {
        this.emailService.sendInvitationEmail(email, invitationCode, description);
    }

}
