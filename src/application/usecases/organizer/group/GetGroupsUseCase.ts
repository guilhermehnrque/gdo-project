import { mapGroupWithoutLocalToDTO } from '../../../../application/mappers/GroupMapper';
import { GroupDTO } from '../../../dto/group/GroupDTO';
import { UserService } from '../../../services/UserService';
import { GroupEntity } from '../../../../domain/entity/GroupEntity';
import { UserEntity } from '../../../../domain/entity/UserEntity';
import { GroupService } from '../../../services/GroupService';

export class GetGroupsUseCase {

    private userService: UserService;
    private groupService: GroupService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(userId: string): Promise<{ active: GroupDTO[], inactive: GroupDTO[] }> {
        const user = await this.stepValidateOrganizer(userId);
        const groups = await this.stepGetOrganizerGroups(user.id);

        const groupDTOs = await this.createGroupDTO(groups);

        return this.categorizeGroupsByStatus(groupDTOs);
    }

    async createGroupDTO(groups: GroupEntity[]): Promise<GroupDTO[]> {
        return await Promise.all(groups.map(mapGroupWithoutLocalToDTO));
    }

    async categorizeGroupsByStatus(groups: GroupDTO[]): Promise<{ active: GroupDTO[], inactive: GroupDTO[] }> {
        const activeGroups = groups.filter(group => group.is_active);
        const inactiveGroups = groups.filter(group => !group.is_active);

        return {
            active: activeGroups,
            inactive: inactiveGroups
        };
    }

    async stepValidateOrganizer(userId: string): Promise<UserEntity> {
        return await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
    }

    async stepGetOrganizerGroups(userIdPk: number): Promise<GroupEntity[]> {
        return await this.groupService.getOrganizerGroupsByUserIdPk(userIdPk);
    }

}