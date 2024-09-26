import { GroupsUsersService } from "../../../services/GroupsUsersService";
import { UserService } from "../../../services/UserService";
import sequelize from "../../../../infrastructure/database/index";

export class GroupRegisterUseCase { 

    private groupsUsersService: GroupsUsersService;
    private userService: UserService;

    constructor() {
        this.groupsUsersService = new GroupsUsersService();
        this.userService = new UserService();
    }

    async execute(groupId: number, userId: string): Promise<void> {
        const transaction = await sequelize.transaction();

        const user = await this.userService.getUserByUserId(userId);

        await this.groupsUsersService.registerUserInGroup(groupId, user.id, transaction);
    }

}