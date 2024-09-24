import { GroupEntity } from "../../../domain/entity/GroupEntity";
import { GroupService } from "../../services/GroupService";
import { GroupsUsersService } from "../../services/GroupsUsersService";
import { UserService } from "../../services/UserService";

export class ListGroupUseCase {

    private userService: UserService
    private groupService: GroupService
    private groupsUserService: GroupsUsersService

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.groupsUserService = new GroupsUsersService();
    }

    async execute(userId: string) {
        const user = await this.getUserData(userId);
        const groupsId = await this.getUserGroups(user.id);
        const groupData = await this.getGroupData(groupsId);

        return await this.prepareGroupDetails(groupData);
    }

    async getUserData(userId: string) {
        return await this.userService.getUserByUserId(userId);
    }

    async getUserGroups(userId: number) {
        const groups = await this.groupsUserService.getGroupUsers(userId);
        return groups.map(group => group.groups_id);
    }

    async getGroupData(groupsId: number[]) {
        return await Promise.all(groupsId.map(groupId => {
            return this.groupService.getGroupById(groupId);
        }));
    }

    async prepareGroupDetails(groupData: GroupEntity[]) {
        return groupData.map(group => {
            return {
                id: group.id,
                description: group.description,
                status: group.is_active
            }
        })
    }

}