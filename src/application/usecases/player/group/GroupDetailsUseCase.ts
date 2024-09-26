import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { UserEntity } from "../../../../domain/entity/UserEntity";
import { GroupService } from "../../../services/GroupService";
import { GroupsUsersService } from "../../../services/GroupsUsersService";
import { LocalService } from "../../../services/LocalService";
import { UserService } from "../../../services/UserService";
import { parseKeysToCamelCase } from "../../../utils/SnakeToCamel";

export class GroupDetailsUseCase {

    private userService: UserService;
    private groupService: GroupService;
    private groupsUserService: GroupsUsersService;
    private localsService: LocalService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.groupsUserService = new GroupsUsersService();
        this.localsService = new LocalService();
    }

    public async execute(userId: string, groupIdPk: number): Promise<Object> {
        const user = await this.getUserData(userId);

        await this.groupsUserService.ensureUserIsMemberOfGroup(user.id, groupIdPk);

        const group = await this.getGroupData(groupIdPk);

        return await this.prepareGroupDetails(group, user);
    }

    private async getUserData(userId: string) {
        return await this.userService.getUserByUserId(userId);
    }

    private async getGroupData(groupIdPk: number) {
        return await this.groupService.getGroupById(groupIdPk);
    }

    private async getGroupLocals(groupIdPk: number) {
        const locals = await this.localsService.getGroupLocalsByGroupId(groupIdPk);
        return parseKeysToCamelCase(locals);
    }

    private async prepareGroupDetails(group: GroupEntity, user: UserEntity): Promise<Object> {
        return {
            userId: user.id,
            groupId: group.id,
            groupDescription: group.description,
            groupStatus: group.is_active,
            groupVisibility: group.visibility,
            groupLocals: await this.getGroupLocals(group.id!),
        };
    }

}