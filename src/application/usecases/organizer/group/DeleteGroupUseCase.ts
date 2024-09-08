import { GroupRepositoryImpl } from '../../../../infrastructure/repositories/GroupRepositoryImpl';
import { GroupEntity } from '../../../../domain/entity/GroupEntity';
import { GroupService } from '../../../services/GroupService';
import { UserService } from '../../../services/UserService';
import { UserEntity } from '../../../../domain/entity/UserEntity';

export class DeleteGroupUseCase {

    private groupRepository: GroupRepositoryImpl;
    private userService: UserService;
    private groupService: GroupService;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(groupId: number, userId: string): Promise<void> {
        const user = await this.stepValidateOrganizer(userId);
        const group = await this.stepValidateOrganizerGroup(user.id, groupId);
        group.is_active = false;

        const groupEntity = await GroupEntity.createFromPayloadUpdate(group)

        await this.groupRepository.changeGroupStatus(groupEntity);

        await this.groupRepository.deleteGroupById(group.id!, group.users_id);
    }

    async stepValidateOrganizer(userId: string): Promise<UserEntity> {
        return await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
    }

    async stepValidateOrganizerGroup(groupId: number, userIdPk: number): Promise<GroupEntity> {
        return await this.groupService.ensureIsOwnerGroupAndReturnGroup(groupId, userIdPk);
    }

}