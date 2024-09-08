import { GroupEntity } from '../../../../domain/entity/GroupEntity';
import { UserEntity } from '../../../../domain/entity/UserEntity';
import { GroupVisibilityEnum } from '../../../../domain/enums/GroupVisibilityEnum';
import { GroupRepositoryImpl } from '../../../../infrastructure/repositories/GroupRepositoryImpl';
import { GroupService } from '../../../services/GroupService';
import { UserService } from '../../../services/UserService';

export class UpdateGroupUseCase {

    private groupRepository: GroupRepositoryImpl;
    private userService: UserService;
    private groupService: GroupService;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(groupId: number, userId: string, description: string, status: boolean, visibility: GroupVisibilityEnum): Promise<number> {
        const user = await this.stepValidateOrganizer(userId);
        const group = await this.stepValidateOrganizerGroup(user.id, groupId);

        const groupEntity = await GroupEntity.createFromPayloadUpdate({
            id: group.id,
            users_id: user.id,
            description,
            is_active: status,
            visibility
        });

        return this.groupRepository.updateGroupById(groupEntity);
    }

    async stepValidateOrganizer(userId: string): Promise<UserEntity> {
        return await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
    }

    async stepValidateOrganizerGroup(groupId: number, userIdPk: number): Promise<GroupEntity> {
        return await this.groupService.ensureIsOwnerGroupAndReturnGroup(groupId, userIdPk);
    }

}