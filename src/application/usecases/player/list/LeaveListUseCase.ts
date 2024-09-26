import { GroupService } from "../../../services/GroupService";
import { GroupsUsersService } from "../../../services/GroupsUsersService";
import { UserService } from "../../../services/UserService";
import sequelize from "../../../../infrastructure/database/index";

export class LeaveListUseCase {

    private userService: UserService
    private groupService: GroupService
    private groupsUserService: GroupsUsersService

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.groupsUserService = new GroupsUsersService();
    }

    async execute(userId: string, groupIdPk: number) {
        const transaction = await sequelize.transaction();

        const user = await this.getUserData(userId);
        await this.ensureGroupExists(groupIdPk);

        await this.groupsUserService.removeUserFromGroup(groupIdPk, user.id, transaction);
    }

    async getUserData(userId: string) {
        return await this.userService.getUserByUserId(userId);
    }

    async ensureGroupExists(groupId: number) {
        this.groupService.getGroupById(groupId);
    }

}