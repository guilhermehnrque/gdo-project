import { GroupRepositoryImpl } from '../../../../infrastructure/repositories/GroupRepositoryImpl';
import { GroupEntity } from '../../../../domain/entity/GroupEntity';
import { UserEntity } from '../../../../domain/entity/UserEntity';
import { GroupService } from '../../../services/GroupService';
import { UserService } from '../../../services/UserService';

export class UpdateGroupStatusUseCase {

    private groupRepository: GroupRepositoryImpl;
    private userService: UserService;
    private groupService: GroupService;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(groupId: number, userId: string, status: boolean): Promise<number> {
        const user = await this.stepValidateOrganizer(userId);
        const group = await this.stepValidateOrganizerGroup(user.id, groupId);
        group.is_active = status;

        const groupEntity = await GroupEntity.createFromPayloadUpdate(group);

        return await this.groupRepository.changeGroupStatus(groupEntity);
    }

    async stepValidateOrganizer(userId: string): Promise<UserEntity> {
        return await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
    }

    async stepValidateOrganizerGroup(groupId: number, userIdPk: number): Promise<GroupEntity> {
        return await this.groupService.ensureIsOwnerGroupAndReturnGroup(groupId, userIdPk);
    }

}