import { InvitationEntity } from "../../../domain/entity/InvitationEntity";
import Group from "../../../domain/models/GroupModel";
import { User } from "../../../domain/models/UserModel";
import GroupRepositoryImpl from "../../../infrastructure/repositories/GroupRepositoryImpl";
import { InvitationRepositoryImpl } from "../../../infrastructure/repositories/InvitationRepositoryImpl";
import UserRepositoryImpl from "../../../infrastructure/repositories/UserRepositoryImpl";
import GroupNotFoundError from "../../erros/groups/GroupNotFoundError";
import UserNotFoundError from "../../erros/UserNotFoundError";

export class CreateInvitationUseCase {

    private invitationRepository: InvitationRepositoryImpl;
    private userRepository: UserRepositoryImpl;
    private groupRepository: GroupRepositoryImpl;

    constructor() {
        this.invitationRepository = new InvitationRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
        this.groupRepository = new GroupRepositoryImpl();
    }

    async execute(userId: number, groupId: number, ownerInvitationUserId: string): Promise<string> {
        const user = await this.getUserByUserPk(userId);
        const userOwner = await this.getUserByUserId(ownerInvitationUserId);
        const group = await this.getGroupById(groupId);

        const invitationEntity = await InvitationEntity.createFromPayload(group.id, user.id, 'PENDING', userOwner.id);
        
        const invitationCreated = await this.invitationRepository.createInvitation(invitationEntity);

        if (!invitationCreated) {
            throw new Error('Error creating invitation');
        }
        
        return invitationEntity.code;
    }

    async getUserByUserPk(userId: number): Promise<User> {
        const user = await this.userRepository.getUserByPK(userId);

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

}